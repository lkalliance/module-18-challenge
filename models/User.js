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
        validator: (value) => {
          return /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(value);
        },
        message: (em) => `${em.value} is not a valid email address`,
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
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

userSchema.virtual("thoughtCount").get(function () {
  return this.thoughts ? this.thoughts.length : 0;
});

userSchema.virtual("friendCount").get(function () {
  return this.friends ? this.friends.length : 0;
});

const User = model("user", userSchema);

module.exports = User;
