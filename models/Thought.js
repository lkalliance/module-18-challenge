const { Schema, model } = require("mongoose");

// formatter to be used when getting date
const formatDate = (d) => {
  return d.toLocaleDateString();
};

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
  },
  reactionText: {
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
    // array of reactions with subdocument schema
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual field that gives current number of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions ? this.reactions.length : 0;
});

// getters for retrieving reaction and thought dates, formatted
reactionSchema.methods.getCreated = () => {
  return formatDate(this.createdAt);
};

thoughtSchema.methods.getCreated = () => {
  return formatDate(this.createdAt);
};

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
