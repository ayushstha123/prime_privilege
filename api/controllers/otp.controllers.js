import OTP from '../models/otp.model.js';
import User from '../models/user.model.js';

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

// Function to generate a random 6-digit OTP
function generateOTP() {
  const min = 100000;
  const max = 999999;
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  return otp.toString();
}
