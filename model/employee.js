const mongoose = require("mongoose")
const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const employeeModel = mongoose.model("employees", employeeSchema);
module.exports = employeeModel;