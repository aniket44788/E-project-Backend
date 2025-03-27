const mongoose = require("mongoose");
async function main() {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database is Connected...!")
}
module.exports = main;