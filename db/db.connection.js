const mongoose = require("mongoose");

function connect() {
    // Connect to MongoDB
    mongoose.connect("mongodb://localhost:27017/BlueStock", ).then( response => {
        console.log("Connected to MongoDB!");
    }).catch( err => {
        console.error("Error connecting to MongoDB:", err);
    })
}
module.exports = connect;