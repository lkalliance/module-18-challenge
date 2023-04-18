const { Schema, model } = require("mongoose");

const formatDate = (d) => {
  return d.toLocaleDateString();
};

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
  },
  reactionBody: {
    type: String,
    required: true,
    minLength: [1, "At least one character is required"],
    maxLength: [280, "Longer than maximum of 280 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  username: {
    type: String,
    required: true,
    minLength: [1, "At least one character is required"],
    maxLength: [280, "Longer than maximum of 280 characters"],
  },
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: [1, "At least one character is required"],
      maxLength: [280, "Longer than maximum of 280 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
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

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions ? this.reactions.length : 0;
});

reactionSchema.methods.getCreated = () => {
  return formatDate(this.createdAt);
};

thoughtSchema.methods.getCreated = () => {
  return formatDate(this.createdAt);
};

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
