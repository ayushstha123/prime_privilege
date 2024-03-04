import express from 'express';
import { signin, signup, signout } from '../controllers/auth.controller.js';
import { sendOTP } from '../controllers/otp.controllers.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.post('/sendotp', sendOTP);

export default router;
