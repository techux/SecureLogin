const nodemailer = require("nodemailer");
require("dotenv").config();


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false, 
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});


const sendEmail = async (to, otp) => {
  try {
    const mailOptions = {
        from: `"OTP Verification" <${process.env.SMTP_MAIL_FROM}>`,
        to,
        subject: "Verify you Email to proceed further",
        html: `<p>Dear User,</p>
            <p>Please use the following OTP to verify your email and complete your registration on our platform:</p>
            <h2 style="color: #2c3e50;">${otp}</h2>`
    };

    const info = await transporter.sendMail(mailOptions);
    if (info.response.includes('250')){
        return true
    }
    return false

  } catch (error) {
    console.log(`[ERROR] Error in sendmail function: ${error || error.message}`);
    return false
  }
}

module.exports = sendEmail;

// sendEmail("deveshkumarsingh75@gmail.com", 12345);