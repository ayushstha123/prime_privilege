const express = require('express');
const { signin, signup, signout } = require('../controllers/auth.controller.js');
const { sendOTP } = require('../controllers/otp.controllers.js');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.post('/sendotp', sendOTP);

module.exports = router;
