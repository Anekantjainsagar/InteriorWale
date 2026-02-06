const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Check if model already exists to avoid OverwriteModelError in dev
const Subscribe =
  mongoose.models.Subscribe || mongoose.model("Subscribe", subscribeSchema);

module.exports = Subscribe;
