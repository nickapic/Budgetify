class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    //So it wont pollute our stackTrace object which is requied while we debug our software
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
