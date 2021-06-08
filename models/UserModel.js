const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
  },
  fullname: {
    type: String,
    required: [true, "full name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
});

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(15).required(),
    fullname: Joi.string().min(5).max(25).required(),
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(6).max(50).required(),
  });

  return schema.validate(user);
};

const validateLogin = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(15).required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
};

const UserModel = new mongoose.model("User", UserSchema);

module.exports = {
  UserModel,
  validateUser,
  validateLogin,
};
