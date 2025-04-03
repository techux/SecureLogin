const express = require("express");
const { sendOtpController, verifyOtpController } = require("../controllers/otp.controller");

const router = express.Router();

router.post("/send", sendOtpController);


module.exports = router;
