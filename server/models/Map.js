const mongoose = require("mongoose");

const mapSchema = new mongoose.Schema(
  {
    state: { type: String, required: true },
    count: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Map", mapSchema);
