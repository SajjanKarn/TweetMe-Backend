const UserAuthRouter = require("../routes/UserAuthRoute");
const UserTweetRouter = require("../routes/UserTweet");
const UserProfileRouter = require("../routes/UserProfile");
const HomeRouter = require("../routes/HomeRoute");

const ErrorMiddleware = require("../middlewares/error.middleware");

module.exports = (app) => {
  // routes.
  app.use("/api/auth", UserAuthRouter);
  app.use("/api/user", UserTweetRouter);
  app.use("/api/user", UserProfileRouter);
  app.use("/", HomeRouter);

  // error handling middleware.
  app.use(ErrorMiddleware);
};
