const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../models/UserModel");

exports.register_user = async (req, res) => {
  const { username, fullname, email, password } = req.body;

  // valid username length and check for any spaces
  if (username.indexOf(" ") > -1)
    return res.status(400).json({
      error: "Username must not contain any spaces.",
    });

  // check if the user exists already.
  const doesUserAlreadyExist = await UserModel.findOne({ username });
  const doesUserAlreadyExistEmail = await UserModel.findOne({ email });

  if (doesUserAlreadyExistEmail)
    return res.status(400).json({ error: "This email is already in use." });

  if (doesUserAlreadyExist)
    return res.status(400).json({
      error:
        "A user with that username already exists! Please try another one!",
    });

  // hash the user password
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );

  const newUser = new UserModel({
    username,
    fullname,
    email,
    password: hashedPassword,
  });
  const isSuccess = await newUser.save(); // save the user
  if (isSuccess) {
    // if everything went successful. generate a token.
    const payload = { _id: isSuccess._id, username: isSuccess.username };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const currentUser = {
      username: isSuccess.username,
      fullname: isSuccess.fullname,
      email: isSuccess.email,
    };
    return res.status(200).json({
      token: jwtToken,
      user: currentUser,
    });
  }
};

exports.login_user = async (req, res) => {
  const { username, password } = req.body;

  const doesUserExist = await UserModel.findOne({ username });
  if (!doesUserExist)
    return res.status(400).json({ error: "Incorrect username or password" });

  // if exists then match the password
  const doesPasswordMatch = await bcrypt.compare(
    password,
    doesUserExist.password
  );

  if (!doesPasswordMatch)
    return res.status(400).json({ error: "Incorrect username or password" });

  // else he's verified and generate a jwt token
  const payload = { _id: doesUserExist._id, username: doesUserExist.username };
  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const user = {
    username: doesUserExist.username,
    fullname: doesUserExist.fullname,
    email: doesUserExist.email,
  };

  return res.status(200).json({
    token: jwtToken,
    user,
  });
};
