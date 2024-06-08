const mongoose = require("mongoose");
const validator = require("validator");

const emailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please Provide Your valid email"],
    },
  },
  { timestamps: true }
);

module.exports.CollectEmail = mongoose.model("CollectEmail", emailSchema);
