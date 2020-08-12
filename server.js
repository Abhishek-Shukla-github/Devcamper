let express = require("express");
let dotenv = require("dotenv");
let colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

//Routes File
let bootcamps = require("./routes/bootcamps");

//Load the env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

//Mount Routers
app.use("/api/v1/bootcamps", bootcamps);

//Middleware is always placed after mounting the routes
app.use(errorHandler);//Using errorHandler here makes it available globally for all routes

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandles promise Rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:- ${err.message}`.red);
  //CLose the server $ exit the process
  server.close(() => process.exit(1));
});
