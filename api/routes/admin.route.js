import express from 'express';
import { getAllUsers } from '../controllers/admin.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Protected route accessible only to admin users
router.get('/alluser', verifyToken, (req, res, next) => {
    getAllUsers(req, res, next);
});

export default router;
