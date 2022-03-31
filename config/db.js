const mongoose = require("mongoose"); // import mongoose package
require("dotenv").config({ path: "./.env" });

// Database config
const connectDB = () => {
    try {
            mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
  
module.exports = connectDB;