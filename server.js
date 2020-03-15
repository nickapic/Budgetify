const express = require("express");
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
const globalErrorHandeler = require("./controllers/errorController");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });

connectDB();

const transactions = require("./routes/transactions");

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/transactions", transactions);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl} on this server!`, 404));
});

//Error handling middleware
app.use(globalErrorHandeler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.blue.bold
  )
);
