let app = require("express")();
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config({ path: "./config/.env" });


connectDB(); // establishing a database connection

//valid origins
const allowedOrigins = ["http://localhost:3001",
                        "http://localhost:3000"];

app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = "The CORS policy for this site does not " +
                        "allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        
        return callback(null, true);
    }
}));

app.use(require("express").json());
app.use("/", require("./routes/index"));

//Listen for incoming requests
const port = process.env.PORT || 3500; 
app.listen(port, () => {
    console.log("Working!!!",  `http://localhost:${port}`);
});