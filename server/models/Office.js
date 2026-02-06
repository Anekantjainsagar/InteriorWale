const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  line1: { type: String, required: true },
  line2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, default: "India" },
});

const officeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["corporate", "manufacturing", "contact"],
      required: true,
    },
    address: {
      type: addressSchema,
      required: function () {
        return this.type !== "contact";
      },
    },
    phoneNumbers: [{ type: String }], // Moved to root level
    email: { type: String }, // Moved to root level
    additionalInfo: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

officeSchema.index({ type: 1 }, { unique: true });

module.exports = mongoose.model("Office", officeSchema);
