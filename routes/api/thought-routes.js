const router = require("express").Router();
const {
  getThoughts,
  createThought,
  getOneThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thought")
  .get(getOneThought)
  .delete(deleteThought)
  .put(updateThought);

router.route("/reactions/:id").post(createReaction).delete(deleteReaction);

module.exports = router;
