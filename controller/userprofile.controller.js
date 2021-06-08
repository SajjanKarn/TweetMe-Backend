const { UserModel } = require("../models/UserModel");

exports.get_user_profile = async (req, res) => {
  const { _id } = req.user;
  const user = await UserModel.findOne({ _id }).select("username fullname email");

  if (!user) return res.json({ error: "No such user exists!" });

  return res.json(user);
};
