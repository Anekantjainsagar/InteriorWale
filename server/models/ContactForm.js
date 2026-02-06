const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      minlength: [2, "Name must be at least 2 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number"],
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    enquiryType: {
      type: String,
      enum: ["general", "support", "sales", "feedback"],
      required: [true, "Please select an enquiry type"],
      default: "general",
    },
    city: {
      type: String,
      required: [true, "Please enter your city"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Please enter your message"],
      minlength: [10, "Message must be at least 10 characters long"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
