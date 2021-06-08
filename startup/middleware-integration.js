const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const winston = require("winston");

module.exports = (app) => {
  // adds JSON support to our express app.
  app.use(express.json());

  // enable cors.
  app.use(require("cors")());

  // enable the moragin in development environment.
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("tiny"));
    console.log("morgan enabled....");
  }
};
