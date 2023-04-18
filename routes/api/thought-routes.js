const router = require("express").Router();
const {
  getThoughts,
  createThought,
  getOneThought,
  deleteThought,
  updateThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thought")
  .get(getOneThought)
  .delete(deleteThought)
  .put(updateThought);

module.exports = router;
