const express = require('express');
const otpController = require('../controllers/otp.controller.js'); // Adjust the path based on your project structure

const router = express.Router();

router.post('/send-otp', otpController.sendOTP);

module.exports = router;
