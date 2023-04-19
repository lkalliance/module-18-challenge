const { User, Thought } = require("../models");

const getUsers = async (req, res) => {
  // This controller returns all users
  // No req parameters
  try {
    const users = await User.find().select("-__v");
    if (!users) {
      // no stored users
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
  // This controller returns one user
  // One req.param "user"
  try {
    const user = await User.findOne({ _id: req.params.user })
      .select("-__v")
      .populate("thoughts")
      .populate("friends");
    if (!user) {
      // the selected user doesn't exist
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
  // This controller creates a new user
  // req.body with username and email address
  try {
    // check to make sure data is in req.body
    if (!(req.body.username && req.body.email)) {
      res.status(400).json({
        message:
          "A new user request must include both a unique username and unique email address.",
      });
      return;
    }

    // check to confirm neither username nor email is taken
    const userCheck = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (userCheck) {
      // username or email already in use
      res.status(400).json({
        messagte: `Either the username ${req.body.username} or email ${req.body.email} is already taken. The thought police require both to be unique.`,
      });
      return;
    }

    // create the user
    const user = await User.create(req.body);
    if (!user) {
      res.status(500).json({ message: "Failed to create user" });
      return;
    }
    res.status(200).json({
      message: `User ${req.body.username} has been created. We'll be watching this one very closely.`,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

const deleteUser = async (req, res) => {
  // This controller deletes a user
  // One req.param "user"
  try {
    // find and remove user if it exists
    const user = await User.findOneAndRemove({ _id: req.params.user });
    if (!user) {
      // user doesn't exist
      res.status(400).json({
        message: `The user ${req.params.user} does not exist. You may wish to try an alternate universe. Or select a different user to eliminate.`,
      });
      return;
    }

    // delete all of the user's thoughts
    await Thought.deleteMany({ username: user.username }, { new: true });
    // delete all of the user's reactions to any remaining thoughts
    await Thought.updateMany(
      { "reactions.username": user.username },
      { $pull: { reactions: { username: user.username } } },
      { new: true }
    );
    // remove deleted user from all other users' friends lists
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
  // This controller updates a user's data
  // req.body has fields to update, one req.param "user"
  try {
    // make sure they're not trying to change to an in-use username or email
    if (req.body.username || req.body.email) {
      const userCheck = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      });
      if (userCheck) {
        // username or email already in use
        res.status(400).json({
          messagte: `Either the username or email you're trying to use is already taken. The thought police require both to be unique.`,
        });
        return;
      }
    }

    // find the user and update everything in req.body
    const user = await User.findOneAndUpdate(
      { _id: req.params.user },
      req.body,
      { new: true }
    );
    if (!user) {
      // user doesn't exist
      res.status(400).json({
        message: `The user ${req.params.user} does not exist. You may wish to try an alternate universe. Or select a different user to reprogram.`,
      });
      return;
    }

    if (req.body.username) {
      // if username was changed, change username on all credited thoughts
      await Thought.updateMany(
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
  // This controller creates a new friends link
  // Two req.params "user" and "friend"
  try {
    // search for each user to confirm existence
    const user1 = await User.findOne({ _id: req.params.user });
    const user2 = await User.findOne({ _id: req.params.friend });
    if (!(user1 && user2)) {
      // one of them doesn't exist
      res.status(400).json({
        message: `One or both of the indicated users does not exist. We do not have the technology to create imaginary friends.`,
      });
      return;
    }

    // check to make sure users aren't already friends
    // (only need to check one as all friend links are reciprocal)
    if (user1.friends.includes(user2._id)) {
      // they are already friends
      res.status(400).json({
        message: `${user1.username} and ${user2.username} are already friends. And Bobby is taking Jenny to the prom.`,
      });
      return;
    }

    // place each user onto the other's friend list
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
  // This controller removes a friendship link
  // Two req.params "user" and "friend"
  try {
    // confirm both users exist
    const user1 = await User.findOne({ _id: req.params.user });
    const user2 = await User.findOne({ _id: req.params.friend });
    if (!(user1 && user2)) {
      // at least one doesn't exist
      res.status(400).json({
        message: `One or both of the indicated users does not exist. We do not have the technology to ruin imaginary friendships.`,
      });
      return;
    }

    // confirm that they are actually already friends
    // (only need to check one as all friend links are reciprocal)
    if (!user1.friends.includes(user2._id)) {
      // they aren't already friends
      res.status(400).json({
        message: `${user1.username} and ${user2.username} aren't friends currently. They are two ships that have passed in the night.`,
      });
      return;
    }

    // remove each user from the other's friends list
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
