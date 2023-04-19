const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        // validates correct composition of email address
        validator: (value) => {
          return /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(value);
        },
        message: (em) => `${em.value} is not a valid email address`,
      },
    },
    // array of thoughts with thought ids
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    // array of friends with user ids
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual fields to count total number of thoughts and friends
userSchema.virtual("thoughtCount").get(function () {
  return this.thoughts ? this.thoughts.length : null;
});

userSchema.virtual("friendCount").get(function () {
  return this.friends ? this.friends.length : null;
});

const User = model("user", userSchema);

module.exports = User;
