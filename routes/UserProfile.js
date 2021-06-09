const router = require("express").Router();

const UserAuthMiddleware = require("../middlewares/auth.middleware");

const UserProfileController = require("../controller/userprofile.controller");

router.get(
  "/profile",
  UserAuthMiddleware,
  UserProfileController.get_user_profile
);

router.delete(
  "/profile/delete",
  UserAuthMiddleware,
  UserProfileController.delete_user
);

module.exports = router;
