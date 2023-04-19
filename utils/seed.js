const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { createUser, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // clear out all existing users and thoughts
  await Thought.deleteMany({});
  await User.deleteMany({});

  let emails = [], // array of user emails
    userNames = [], // array of usernames
    users = []; // array of prepped users

  while (users.length < 12) {
    // create a user, check if username or email is taken
    // if not, create in db and push to users array (continue until there are 12)
    const user = createUser();
    if (!(emails.includes(user.email) || userNames.includes(user.username))) {
      const newUser = await User.create(user);
      emails.push(user.email);
      userNames.push(user.username);
      users.push(newUser);
    }
  }

  for (let i = 0; i < thoughts.length; i++) {
    // go through all thoughts, and randomly assign to users
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

  // create random friend pairs
  const friendPairs = [];
  for (let i = 0; i < 15; i++) {
    // randomly choose two users
    const friend1 = users[Math.trunc(Math.random() * users.length)]._id;
    const friend2 = users[Math.trunc(Math.random() * users.length)]._id;
    if (
      !(
        friend1 == friend2 ||
        friendPairs.includes([friend1, friend2]) ||
        friendPairs.includes([friend2, friend1])
      )
    ) {
      // if they aren't already friends, add to the array
      // do this up to 15 times
      friendPairs.push([friend1, friend2]);
    }

    for (pair of friendPairs) {
      // iterate over pairs, reciprocally place on each others' frends list
      await User.findOneAndUpdate(
        { _id: pair[0] },
        { $addToSet: { friends: pair[1] } },
        { new: true }
      );
      await User.findOneAndUpdate(
        { _id: pair[1] },
        { $addToSet: { friends: pair[0] } },
        { new: true }
      );
    }
  }

  // I liked the little plant seedling, so I, um, also thought of that idea.
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
