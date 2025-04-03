const Otp = require("../models/otp.model");
const User = require("../models/user.model");
const sendEmail = require("../utils/sendmail");

const sendOtpController = async (req, res) => {
    try {
        
        const { email } = req.body;

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

const verifyOtpController = async (req, res) => {
    try {
        const {email, otp} = req.body ;
        const result = await Otp.findOne({email, otp}) ;
        
        if(result) {
            await User.updateOne(
                { email }, 
                { $set: { isVerified: true } }
              );            
            return res.json({status:"ok", message:"OTP verified successfully"}) ;
        }
        return res.status(400).json({
            status:"error", 
            message:"Invalid OTP"
        }) ;

    } catch (error) {
        console.log(`[ERROR] Error in verifyOtpController: ${error || error.message}`);
        return res.status(500).json({
            status:"error", 
            message:"Unable to verify mail, please retry again"
        })        
    }
}


module.exports = {
    sendOtpController,
    verifyOtpController
}