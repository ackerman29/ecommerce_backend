const ErrorHandler = require("../utils/errorhander");



module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  // jsonweb token error
  if (err.code === "JsonWebTokenError") {
    const message = `Json web token is invalid.. try again..`;
    err = new ErrorHandler(message, 400);
  }

  // jwt expire error
  if (err.code === "TokenExpired Error") {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }


  res.status(err.statusCode).json({
    success: false,
    message: err.message
  })
};