const router = require("express").Router();
const {
  getUsers,
  // createUser,
  getOneUser,
  // deleteUser,
  // editUser,
} = require("../../controllers/userController");

router.route("/").get(getUsers);
// .post(createUser);

router.route("/:user").get(getOneUser);
// .delete(deleteUser).put(editUser);

// router.get("/", async (req, res) => {
//   // get list of all users
//   try {
//     res.json({ message: "Getting a list of all users" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.get("/:id", async (req, res) => {
//   // get one user
//   try {
//     res.json({ message: `Getting user number ${req.params.id}` });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.post("/", async (req, res) => {
//   // creates a new user
//   try {
//     res.json({ message: "Creating a user" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
