require("express-async-errors");
const winston = require("winston");

module.exports = () => {
  // handle unCaughtException errors.
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaught_exception.log" })
  );

  // handle unhandledPromise - Rejection
  process.on("unhandledRejection", (err) => {
    throw err;
  });

  // log the error and shut down the server if occurs.
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
};
