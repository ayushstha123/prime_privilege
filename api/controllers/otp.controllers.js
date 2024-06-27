const OTP = require('../models/otp.model.js');
const User = require('../models/user.model.js');
const crypto = require('crypto');
const { errorHandler } = require('../utils/error.js');
const { resetMailSender } = require('../utils/mailSender.js');
const Business = require('../models/business.model.js');

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user is already registered in either User or Business collection
    const checkUser = await User.findOne({ email }) || await Business.findOne({ email });

    if (checkUser) {
      return res.status(401).json({
        success: false,
        message: 'User is already registered',
      });
    }

    // Generate a unique OTP
    let otp;
    let otpExists = true;

    while (otpExists) {
      otp = generateOTP();
      otpExists = await OTP.exists({ otp });
    }

    // Save the OTP in the database
    const otpPayload = { email, otp };
    await OTP.create(otpPayload);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.forgotPasswordOtp = async (req, res,next) => {
  try {
    const { email } = req.body;

    // Check if user is already present
    const user= await User.findOne({ email }) || await Business.findOne({ email });
    if(!user){
      return next(errorHandler(400, 'User not found'));
    }

    await resetMailSender(email, "Reset Password", user);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',

    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};



// Function to generate a random 6-digit OTP
function generateOTP() {
  return crypto.randomBytes(20).toString('hex').slice(0, 10);
}