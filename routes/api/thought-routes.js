const router = require("express").Router();
const { Thought } = require("../../models");

router.get("/", async (req, res) => {
  // get list of all thoughts
  try {
    res.json({ message: "Getting a list of all thoughts" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // get one thought
  try {
    res.json({ message: `Getting thought number ${req.params.id}` });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // creates a new thought
  try {
    res.json({ message: "Creating a thought" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
