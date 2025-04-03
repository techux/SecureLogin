const express = require("express");

const {loginController, registerController } = require("../controllers/auth.controller");

const { sendOtpController, verifyOtpController } = require("../controllers/otp.controller");

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);

router.post("/otp/send", sendOtpController);
router.post("/otp/verify", verifyOtpController);

module.exports = router;
