const router = require("express").Router();
const {
  getThoughts,
  createThought,
  getOneThought,
  // deleteUser,
  // editUser,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thought").get(getOneThought);

module.exports = router;
