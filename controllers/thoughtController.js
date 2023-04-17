const { User, Thought } = require("../models");

const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    if (!thoughts) {
      res.status(400).json({ message: "There are no thoughts" });
      return;
    }
    res.status(200).json(thoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

const getOneThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thought });
    if (!thought) {
      res.status(400).json({
        message: `Thought with id ${req.params.thought} does not exist. Think harder.`,
      });
      return;
    }
    res.status(200).json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

const createThought = async (req, res) => {
  try {
    // do we have everything?
    if (!(req.body.username && req.body.thoughtText)) {
      res.status(400).json({
        message: "A new thought must come from someone and can't be blank.",
      });
      return;
    }
    // does the username exist?
    const usernameCheck = await User.findOne({ username: req.body.username });
    if (!usernameCheck) {
      res.status(400).json({
        messagte: `The username ${req.body.username} does not exist. Please suggest a different thinker.`,
      });
      return;
    }
    console.log(usernameCheck);
    const thought = await Thought.create(req.body);
    await User.findOneAndUpdate(
      { _id: usernameCheck._id },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );
    res.status(200).json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = { getThoughts, getOneThought, createThought };
