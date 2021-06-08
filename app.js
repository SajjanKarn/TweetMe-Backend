require("dotenv").config();
const express = require("express");
const app = express();

// startup files integration.
require("./startup/exception-handler")();
require("./startup/middleware-integration")(app);
require("./startup/routes")(app);
require("./startup/database")();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started listening on port: ${PORT} ....`);
});
