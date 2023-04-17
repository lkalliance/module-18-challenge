const { User } = require("../models");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(400).json({ message: "There are no users" });
      return;
    }
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.user });
    if (!user) {
      res
        .status(400)
        .json({ message: `User with id ${req.params.user} does not exist.` });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

const createUser = async (req, res) => {
  try {
    // is there a username and an email?
    if (!(req.body.username && req.body.email)) {
      res.status(400).json({
        message:
          "A new user request must include both a unique username and unique email address.",
      });
      return;
    }
    // does the username already exist?
    const usernameCheck = await User.findOne({ username: req.body.username });
    if (usernameCheck) {
      res.status(400).json({
        messagte: `The username ${req.body.username} is already taken. Please try a different username.`,
      });
      return;
    }
    // does the email already exist?
    const emailCheck = await User.findOne({ email: req.body.email });
    if (emailCheck) {
      res.status(400).json({
        messagte: `The email address ${req.body.email} is already listed for a different user. Please try a different email address.`,
      });
      return;
    }
    const newUser = await User.create(req.body);
    if (!newUser) {
      res.status(500).json({ message: "Failed to create user" });
      return;
    }
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = { getUsers, getOneUser, createUser };
