const mongoose = require("mongoose");
const sendEmail = require("../utils/sendmail");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // 5 minutes || Delete the entry automatically after 5 minutes
  },
});

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
