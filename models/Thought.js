const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  // create "reactionId" based on ObjectId model
  reactionBody: {
    type: String,
    required: true,
    // between 1 and 280 chars
  },
  createdAt: {
    type: Date,
    // default is now
    // create getter  method to get formatted date
  },
  username: {
    type: String,
    required: true,
    // between 1 and 280 chars
  },
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      // between 1 and 280 chars
    },
    createdAt: {
      type: Date,
      // default is now
      // create getter  method to get formatted date
    },
    username: {
      type: String,
      required: true,
      // between 1 and 280 chars
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
