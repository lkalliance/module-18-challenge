const router = require("express").Router();
const {
  getThoughts,
  createThought,
  getOneThought,
  deleteThought,
  // editUser,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thought").get(getOneThought).delete(deleteThought);

module.exports = router;
