const Otp = require("../models/otp.model");
const User = require("../models/user.model");
const sendEmail = require("../utils/sendmail");

const sendOtpController = async (req, res) => {
    try {
        
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(404).json({
                status: "error",
                message: "User already registered..."
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        const result = await Otp.create({
            email,
            otp
        })

        const mailStatus = sendEmail(email, otp)

        if (result && mailStatus){
            return res.status(200).json({
                status: "ok",
                message: "OTP sent successfully",
            });
        }
        
        return res.status(500).json({
            status: "error",
            message: "Failed to send OTP",
        });


    } catch (error) {
        console.log(`[ERROR] Error in sendOtpController: ${error || error.message}`);
        return res.status(500).json({
            status:"error", 
            message:"Unable to verify mail, please retry again"
        })        
    }
}


module.exports = {
    sendOtpController,
}