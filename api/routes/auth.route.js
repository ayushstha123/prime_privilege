import express from 'express';
import { signin, signup, signout, business_signup, business_signin,google } from '../controllers/auth.controller.js';
import { forgotPasswordOtp, sendOTP } from '../controllers/otp.controllers.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/business-signup', business_signup);
router.post('/google', google);
router.post('/business-signin', business_signin);
router.get('/signout', signout);
router.post('/sendotp', sendOTP);
router.post('/forgot-password', forgotPasswordOtp);


export default router;
