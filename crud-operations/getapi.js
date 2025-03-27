const express = require("express");
const schemaModel = require("../model/schema");
const getapi = express.Router();
const fs = require("fs")
getapi
  .get("/", async (req, res) => {
    try {
      const getallapi = await schemaModel.find();
      res.status(200).json({
        success: true,
        message: "Data fetched successfully.",
        data: getallapi,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching data.",
        error: error.message,
      });
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await schemaModel.findById(id); // Fetching product from MongoDB

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
  .get("/find/:category", async (req, res) => {
    const { category } = req.params;
    try {
      const data = await schemaModel.find({ category: category });
      if (data.length <= 0) {
        return res.status(404).json({ message: "no data found" });
      }
      return res
        .status(200)
        .json({ message: " data found successfully.", data: data });
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }).delete("/:id" , async (req,res)=>{
        const {id} = req.params;
        try {
            const data = await schemaModel.findByIdAndDelete({ _id : id});
            if(data.file){
              fs.unlink(data.file,(err)=>{
                console.error("Error deleting file:", err);
              })
            }
           return res.status(200).json({
                message : "Product deleted Successfully.",
                data:data
            })
        } catch (error) {
            res.status(404).json({
                message : "Error in delete"
            })
        }
  })

module.exports = getapi;
