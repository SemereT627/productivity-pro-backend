const httpStatus = require("http-status");

const notFound = (req, res, next) => {
  return next(
    new APIError(httpStatus[httpStatus.NOT_FOUND], httpStatus.NOT_FOUND)
  );
};

const handler = (err, req, res, next) => {
  let { status, message } = err;
  if (process.env.NODE_ENV === "production" && !err.isOperational) {
    status = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  return res.status(status).json({
    status: status,
    errors: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = {
  notFound,
  handler,
};
