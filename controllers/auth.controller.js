const User = require("../models/user.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validate } = require("email-validator");
const Otp = require("../models/otp.model");
const sendEmail = require("../utils/sendmail");

const loginController = async (req, res) => {
    try {        
        const {email, password, otp} = req.body ;
        if (!email || !password || !otp) {
            return res.status(400).json({
                status: "error",
                message: "Please enter all fields"
            })
        }
        
        const user = await User.findOne({ email });

        if (!user){
            return res.status(400).json({
                status: "error",
                message: "Invalid login credentials"
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword){
            return res.status(400).json({
                status: "error",
                message: "Invalid login credentials"
            })
        }

        const otpResult = await Otp.findOne({email, otp});

        if (!otpResult){
            return res.status(400).json({
                status: "error",
                message: "Email OTP Verfification failed"
            })
        }

        const accessToken = jwt.sign(
            { 
                id: user._id ,
                role: user.role,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h",
            }
        )

        return res.status(200).json({
            status:"ok", 
            message:"Logged in Successfully", 
            accessToken,
        })

    } catch (error) {
        console.error(`Error on loginController ${error.stack || error.message}`)
        res.status(500).json({
            status:"error",
            message: "Internal Server Error"
        });
    }
}


const registerController = async (req, res) => {
    try {
        const {name, email, password, phone} = req.body ;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                status:"error",
                message: "Please fill all the fields"
            })
        }

        if (!validate(email)){
            return res.status(400).json({
                status: "error",
                message: "Invalid email address"
            })
        }

        const userExist = await User.findOne({email}) ;
        if (userExist) {
            return res.status(400).json({
                status: "error",
                message: "Email already exists"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpResult = await Otp.create({ email, otp })
        const mailStatus = sendEmail(email, otp)

        const result = await User.create({name, email, password, phone}) ;

        if (otpResult && mailStatus && result){
            return res.status(201).json({
                status:"ok",
                message: "Registration Success, Please verify OTP send on Mail"
            })
        }

        return res.status(500).json({
            status: "error",
            message: "Something went wrong, please try again",
        })
        
    } catch (error) {
        console.error(`Error in registerController : ${error.stack || error.message}`);
        return res.status(500).json({
            status:"error", 
            message: "Internal Server Error" 
        });
    }
}


module.exports = {
    loginController,
    registerController,
}