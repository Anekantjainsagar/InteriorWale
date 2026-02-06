const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      minlength: [6, "Minimum title length should be 6 characters"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Please add content"],
      minlength: [10, "Content must be at least 50 characters"],
    },
    coverImage: {
      type: String, // URL to cover image
      default: "",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
