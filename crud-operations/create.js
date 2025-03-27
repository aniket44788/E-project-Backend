const express = require("express");
const create = express.Router();
const schemaModel = require("../model/schema");
const upload = require("../utility/multer");
const employeeModel = require("../model/employee");
const nodemailer = require("nodemailer");

// 🟢 Route for Uploading Data (with Image)
create.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, price, description, category } = req.body;
    const image = req.file;

    if (!title || !price || !description || !category || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const userdata = new schemaModel({
      title,
      price,
      description,
      category,
      file: image.path,
    });

    const saveuser = await userdata.save();

    return res.status(201).json({
      success: true,
      message: "Data saved successfully.",
      data: saveuser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error uploading data",
      error: error.message,
    });
  }
});

// 🟢 Register Route (WITHOUT HASHING)
create.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    const existingUser = await employeeModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists!" });
    }
    const newUser = await employeeModel.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: newUser,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed.",
      error: error.message,
    });
  }
});

// 🟢 Login Route (WITHOUT HASHING)
create.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const user = await employeeModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "No email registered." });
    }

    // 🛑 Compare password directly (No Hashing)
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect password." });
    }
    res.json({ success: true, message: "Login successful!" });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Login failed.", error: error.message });
  }
})

module.exports = create;
