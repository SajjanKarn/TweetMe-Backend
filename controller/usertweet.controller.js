const { UserTweetModel } = require("../models/UserTweet");

const validateId = require("../utils/validateId");

const moment = require("moment");

// post tweet.
exports.post_tweet = async (req, res) => {
  const { tweet } = req.body;
  const { _id: userId } = req.user;

  const newTweet = new UserTweetModel({
    tweet,
    postedAt: moment()
      .utcOffset(+05)
      .format(),
    postedBy: userId,
  });

  const result = await newTweet.save();
  return res.json(result);
};

// get all tweet.
exports.get_all_tweets = async (req, res) => {
  const allTweets = await UserTweetModel.find().populate(
    "postedBy",
    "username"
  );

  allTweets.reverse();
  return res.json(allTweets);
};

exports.tweet_count = async (req, res) => {
  const allTweets = await UserTweetModel.find();
  return res.status(200).json(allTweets.length);
};

// delete tweet.
exports.delete_tweet = async (req, res) => {
  const { _id } = req.body;
  const { _id: userId } = req.user;

  if (!_id) return res.json({ error: "No ID found to delete a tweet!" });
  const isIdValid = validateId(_id);

  if (!isIdValid)
    return res.status(400).json({ error: "Please enter a valid ID." });

  const isUserOwnTweet = await UserTweetModel.findOne({ _id }).populate(
    "postedBy",
    "_id username"
  );

  if (!isUserOwnTweet) return res.status(400).json({ error: "There's no such tweet!" });

  // check if its user own tweet.
  if (String(isUserOwnTweet.postedBy._id) !== userId)
    return res.status(400).json({ error: "You cannot delete other user's tweet!" });

  // else he's good to go.
  const result = await UserTweetModel.deleteOne({ _id });
  return res.status(200).json(result);
};

// like and unlike tweet.
exports.like_unlike_tweet = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const tweet = await UserTweetModel.findOne({ _id: id });
  if (!tweet) return res.status(400).json({ error: "No posts found." });

  if (!tweet.likes.includes(userId)) {
    const like_result = await tweet.updateOne({ $push: { likes: userId } });
    return res.status(200).json({ message: "Post has been liked." });
  } else {
    const unlike_result = await tweet.updateOne({ $pull: { likes: userId } });
    return res.status(200).json({ message: "Post has been unliked." });
  }
};

// get user tweets
exports.get_user_tweets = async (req, res) => {
  const { _id: userId } = req.user;

  const userTweets = await UserTweetModel.find({ postedBy: userId }).populate(
    "postedBy "
  );
  if (!userTweets) return res.json({ error: "No tweets available." });
  return res.status(200).json(userTweets);
};
