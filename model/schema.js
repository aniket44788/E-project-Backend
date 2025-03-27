const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  file: {
    required: true,
    type: String,
  }
});
const schemaModel = mongoose.model("e-project", schema);
module.exports = schemaModel;
