const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const { User } = require("../models/userModel");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const { SECRET_KEY } = process.env;

//Register

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
    },
  });
};

//LogIn

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Password is wrong");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

  await User.findByIdAndUpdate(user._id, { token });

  // const { _id, verificationToken } = user;

  res.status(200).json({
    token,
    user: {
      email: user.email,
      name: user.name,
    },
  });
};

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const currentUserData = async (req, res) => {
  const { _id, email, name } = req.user;

  res.json({ _id, email, name });
};

module.exports = {
  register: ctrlWrapper(register),
  logIn: ctrlWrapper(logIn),
  currentUserData: ctrlWrapper(currentUserData),
  logOut: ctrlWrapper(logOut),
};
