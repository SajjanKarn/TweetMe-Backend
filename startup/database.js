const mongoose = require("mongoose");
const winston = require("winston");

module.exports = () => {
  // mongoose connection
  mongoose
    .connect(process.env.MONGOOSE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => console.log("connection to mongodb database was successful!"));
};
