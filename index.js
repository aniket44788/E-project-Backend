require("dotenv").config();
const port = process.env.PORT || 4000;
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const create = require("./crud-operations/create");
const getapi = require("./crud-operations/getapi");

app.use("/create", create);  /* API: http://localhost:4000/create */
app.use("/getapi", getapi);  /* API: http://localhost:4000/getapi */

app.post("/buy", async (req, res) => {
  const { _id, title, price, description, email } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODE_EMAIL,
        pass: process.env.NODE_PASS,
      },
    });

    let mailOptions = {
      from: process.env.NODE_EMAIL,
      to: email,
      subject: "Order Confirmation",
      html: `<h2>Order Details</h2>
             <p>Product ID: ${_id}</p>
             <p>Title: ${title}</p>
             <p>Price: ${price} INR</p>
             <p>Description: ${description}</p>
             <p>Thank you for your purchase!</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Purchase successful! Check your email for details." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to process order." });
  }
});

const main = require("./database/database");
main().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
