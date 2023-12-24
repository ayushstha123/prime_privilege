import express from 'express';
import { signin, signup, google, microsoft , signout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.post('/microsoft', microsoft); // Add the Microsoft authentication route
router.get('/signout', signout);

export default router;
