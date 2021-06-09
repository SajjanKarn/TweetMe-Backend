const { UserModel } = require("../models/UserModel");
const { UserTweetModel } = require("../models/UserTweet");

exports.get_user_profile = async (req, res) => {
  const { _id } = req.user;
  const user = await UserModel.findOne({ _id }).select(
    "username fullname email"
  );

  if (!user) return res.json({ error: "No such user exists!" });

  return res.json(user);
};

exports.delete_user = async (req, res) => {
  const { _id: userId } = req.user;

  const doesUserExist = await UserModel.findOne({ _id: userId });
  if (!doesUserExist)
    return res
      .status(400)
      .json({ error: "no such user exists with that user id." });

  const userTweets = await UserTweetModel.find({ postedBy: userId });
  const deleteUserTweets = await UserTweetModel.deleteMany({
    _id: {
      $in: userTweets,
    },
  });
  const deleteUser = await UserModel.deleteOne({ _id: userId });

  if (deleteUser) {
    return res.status(200).json({message: "deleted user successfully."});
  }
};
