const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { createUser, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  await Thought.deleteMany({});
  await User.deleteMany({});

  let emails = [],
    userNames = [],
    users = [];

  while (users.length < 15) {
    const user = createUser();
    if (!(emails.includes(user.email) || userNames.includes(user.username))) {
      const newUser = await User.create(user);
      emails.push(user.email);
      userNames.push(user.username);
      users.push(newUser);
    }
  }

  for (let i = 0; i < thoughts.length; i++) {
    const user = Math.trunc(Math.random() * users.length);
    const newThought = await Thought.create({
      thoughtText: thoughts[i],
      username: userNames[user],
    });
    await User.findOneAndUpdate(
      { _id: users[user]._id },
      { $addToSet: { thoughts: newThought._id } },
      { new: true }
    );
  }

  const friendPairs = [];

  for (let i = 0; i < 20; i++) {
    const friend1 = users[Math.trunc(Math.random() * users.length)]._id;
    const friend2 = users[Math.trunc(Math.random() * users.length)]._id;
    if (
      !(
        friend1 == friend2 ||
        friendPairs.includes([friend1, friend2]) ||
        friendPairs.includes([friend2, friend1])
      )
    ) {
      friendPairs.push([friend1, friend2]);
    }

    for (pair of friendPairs) {
      const add0 = await User.findOneAndUpdate(
        { _id: pair[0] },
        { $addToSet: { friends: pair[1] } },
        { new: true }
      );
      const add1 = await User.findOneAndUpdate(
        { _id: pair[1] },
        { $addToSet: { friends: pair[0] } },
        { new: true }
      );
    }
  }

  console.info("Seeding complete! 🌱");
  process.exit(0);
});
