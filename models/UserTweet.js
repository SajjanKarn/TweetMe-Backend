const mongoose = require("mongoose");
const Joi = require("joi");

const TweetSchema = new mongoose.Schema({
  tweet: {
    type: String,
    required: [true, "Tweet is required"],
  },
  postedAt: {
    type: String,
    required: [true, "postedAt is required"],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: {
    type: Array,
    default: [],
  },
  likes: {
    type: Array,
    default: [],
  },
});

const validateTweet = (tweet) => {
  const schema = Joi.object({
    tweet: Joi.string().min(5).max(400).required(),
  });

  return schema.validate(tweet);
};

const UserTweetModel = new mongoose.model("Tweet", TweetSchema);

module.exports = {
  UserTweetModel,
  validateTweet,
};
