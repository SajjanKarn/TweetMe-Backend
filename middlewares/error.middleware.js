const winston = require("winston");

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV !== "development") {
    winston.error(err.message, err);
  }
  console.log(err);
  return res.status(500).send({ error: "Something went wrong..." });
};
