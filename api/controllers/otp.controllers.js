import OTP from '../models/otp.model.js';
import User from '../models/user.model.js';
import crypto from 'crypto';
import { errorHandler } from '../utils/error.js';
import { resetMailSender } from '../utils/mailSender.js';
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user is already present
    const checkUserPresent = await User.findOne({ email });

    // If user found with provided email
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: 'User is already registered',
      });
    }

    let otp = generateOTP();

    // Ensure uniqueness in the database
    let result = await OTP.findOne({ otp });
    while (result) {
      otp = generateOTP();
      result = await OTP.findOne({ otp });
    }

    // Save the OTP in the database
    const otpPayload = { email, otp };
    await OTP.create(otpPayload);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',

    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const forgotPasswordOtp = async (req, res,next) => {
  try {
    const { email } = req.body;

    // Check if user is already present
    const user= await User.findOne({ email });
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