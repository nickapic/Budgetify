const express = require("express");
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
const globalErrorHandeler = require("./controllers/errorController");
const colors = require("colors");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cookieparser = require("cookie-parser");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
//Set Security Http Headers
app.use(helmet());

//Body Parser ,reading data from the body into req.body
app.use(
  express.json({
    limit: "10kb"
  })
);
app.use(cookieparser());
//Data sanitization against NoSql query injection
app.use(mongoSanitize());
//Data sanitization against XSS
app.use(xss());
//Protects parameter pollution and solves the error
app.use(hpp({})); //You can use whitelist to use properties that dont wanna use this

//Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Limit requests from same IP address to stop DDOS attacks
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Tooo many requests from this IP, Please try again"
});

app.use("/api", limiter);

//Just our normal routes
app.use("/api/v1/transactions", transactions);
app.use("/api/v1/user", users);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl} on this server!`, 404));
});

//Error handling middleware
app.use(globalErrorHandeler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
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
