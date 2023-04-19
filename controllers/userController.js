const { User, Thought } = require("../models");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-__v");
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
    const user = await User.findOne({ _id: req.params.user })
      .select("-__v")
      .populate("thoughts")
      .populate("friends");
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
    res.status(200).json({
      message: `User ${req.body.username} has been created. We'll be watching this one very closely.`,
      newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.user });
    if (!user) {
      res.status(400).json({
        message: `The user ${req.params.user} does not exist. You may wish to try an alternate universe. Or select a different user to eliminate.`,
      });
      return;
    }
    await Thought.deleteMany({ username: user.username }, { new: true });
    await Thought.updateMany(
      { "reactions.username": user.username },
      { $pull: { reactions: { username: user.username } } },
      { new: true }
    );
    await User.updateMany(
      { friends: req.params.user },
      { $pull: { friends: req.params.user } },
      { new: true }
    );
    res.status(200).json({
      message: `The user ${user.username} has gone down the memory hole. All thoughts of ${user.username} never existed, and all friends of ${user.username} have had their memory purged. We are at war with Oceania. We have always been at war with Oceania.`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.user },
      req.body,
      { new: true }
    );
    if (!user) {
      res.status(400).json({
        message: `The user ${req.params.user} does not exist. You may wish to try an alternate universe. Or select a different user to reprogram.`,
      });
      return;
    }
    if (req.body.username) {
      const thoughts = await Thought.updateMany(
        { username: user.username },
        { $set: { username: req.body.username } },
        { new: true }
      );
    }
    res.status(200).json({
      message: `The user ${
        req.body.username || user.username
      } is now updated. They are no longer the person they were. They are a new person, like a butterfly exiting a cocoon. Fly away, butterfly!`,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

const createFriendship = async (req, res) => {
  try {
    const user1 = await User.findOne({ _id: req.params.user });
    const user2 = await User.findOne({ _id: req.params.friend });
    if (!(user1 && user2)) {
      res.status(400).json({
        message: `One or both of the indicated users does not exist. We do not have the technology to create imaginary friends.`,
      });
      return;
    }
    if (user1.friends.includes(user2._id)) {
      res.status(400).json({
        message: `${user1.username} and ${user2.username} are already friends. And Bobby is taking Jenny to the prom.`,
      });
      return;
    }

    await User.findOneAndUpdate(
      { _id: user1._id },
      { $addToSet: { friends: user2._id } },
      { new: true }
    );
    await User.findOneAndUpdate(
      { _id: user2._id },
      { $addToSet: { friends: user1._id } },
      { new: true }
    );
    res.status(200).json({
      message: `${user1.username} and ${user2.username} are now friends! Matchmaker, matchmaker, make me a match...`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

const ruinFriendship = async (req, res) => {
  try {
    const user1 = await User.findOne({ _id: req.params.user });
    const user2 = await User.findOne({ _id: req.params.friend });
    if (!(user1 && user2)) {
      res.status(400).json({
        message: `One or both of the indicated users does not exist. We do not have the technology to ruin imaginary friendships.`,
      });
      return;
    }
    if (!user1.friends.includes(user2._id)) {
      res.status(400).json({
        message: `${user1.username} and ${user2.username} aren't friends currently. They are two ships that have passed in the night.`,
      });
      return;
    }

    await User.findOneAndUpdate(
      { _id: user1._id },
      { $pull: { friends: user2._id } },
      { new: true }
    );
    await User.findOneAndUpdate(
      { _id: user2._id },
      { $pull: { friends: user1._id } },
      { new: true }
    );
    res.status(200).json({
      message: `${user1.username} and ${user2.username} are no longer friends. They might even be bitter enemies. Better take sides.`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
  createFriendship,
  ruinFriendship,
};
