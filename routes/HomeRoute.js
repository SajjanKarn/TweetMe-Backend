const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("Hello There! this is the index route.");
});

module.exports = router;
