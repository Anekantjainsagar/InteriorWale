const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema(
  {
    logo: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SupportLogos", supportSchema);
