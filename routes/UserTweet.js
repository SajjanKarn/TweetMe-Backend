const router = require("express").Router();

const UserTweetController = require("../controller/usertweet.controller");

const UserAuthMiddleware = require("../middlewares/auth.middleware");

const ValidateMiddleware = require("../middlewares/validate.middleware");
const { validateTweet } = require("../models/UserTweet");

router
  .post(
    "/tweet",
    [UserAuthMiddleware, ValidateMiddleware(validateTweet)],
    UserTweetController.post_tweet
  )
  .get("/tweets", UserAuthMiddleware, UserTweetController.get_all_tweets)
  .get("/profile/tweets", UserAuthMiddleware, UserTweetController.get_user_tweets)
  .get("/tweets/count", UserAuthMiddleware, UserTweetController.tweet_count)
  .post(
    "/tweet/:id/like",
    UserAuthMiddleware,
    UserTweetController.like_unlike_tweet
  )
  .delete("/tweet", UserAuthMiddleware, UserTweetController.delete_tweet);

module.exports = router;
