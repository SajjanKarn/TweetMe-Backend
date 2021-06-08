const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const winston = require("winston");

module.exports = (app) => {
  // adds JSON support to our express app.
  app.use(express.json());

 app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

  // enable cors.
  app.use(require("cors")());

  // enable the moragin in development environment.
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("tiny"));
    console.log("morgan enabled....");
  }
};
