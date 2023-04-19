const router = require("express").Router();
const {
  getUsers,
  createUser,
  getOneUser,
  deleteUser,
  createFriendship,
  ruinFriendship,
  updateUser,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

router.route("/:user").get(getOneUser).delete(deleteUser).put(updateUser);

router.route("/:user/:friend").post(createFriendship).delete(ruinFriendship);

module.exports = router;
