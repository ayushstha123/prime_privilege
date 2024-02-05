import express from 'express';
import otpController from '../controllers/otp.controller.js'; // Adjust the path based on your project structure

const router = express.Router();

router.post('/send-otp', otpController.sendOTP);

export default router;
