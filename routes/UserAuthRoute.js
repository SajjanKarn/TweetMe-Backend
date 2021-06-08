const router = require("express").Router();

const UserAuthController = require("../controller/userauth.controller");

const ValidateMiddleware = require("../middlewares/validate.middleware");
const { validateUser, validateLogin } = require("../models/UserModel");


router
  .post(
    "/register",
    [ValidateMiddleware(validateUser)],
    UserAuthController.register_user
  )

  .post(
    "/login",
    [ValidateMiddleware(validateLogin)],
    UserAuthController.login_user
  );

module.exports = router;
