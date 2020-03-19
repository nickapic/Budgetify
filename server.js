const express = require("express");
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
const globalErrorHandeler = require("./controllers/errorController");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });
process.on("uncaughtException", err => {
  console.log("Uncaught Exception Mr. Developer Go Fix it 🏄🏻‍♂️");
  console.log(err.name, err.message);
  process.exit(1); //Very abrupt to end your Program shuts down all the requests immediately
});

connectDB();

const transactions = require("./routes/transactionsRoutes");
const users = require("./routes/usersRoutes");

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/transactions", transactions);
app.use("/api/v1/user", users);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl} on this server!`, 404));
});

//Error handling middleware
app.use(globalErrorHandeler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.blue.bold
  )
);

process.on("unhandledRejection", err => {
  console.log("Unhandled Rejection Mr. Developer Go Fix it 🏄🏻‍♂️");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); //Very abrupt to end your Program shuts down all the requests immediately
  });
});
