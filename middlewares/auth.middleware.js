const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(403).send("Invalid token!");
      }

      req.user = payload;
      next();
    });
  } else {
    res.status(401).send("Forbidden");
  }
};