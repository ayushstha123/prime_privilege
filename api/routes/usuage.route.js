import express from 'express'
import { addDiscountUsage, getAllDiscountUsages, getUsage, userUsages } from '../controllers/usuage.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create-usage',verifyToken, addDiscountUsage);
router.get('/get-usages/:businessId', verifyToken, getUsage);
router.get('/all-usages', verifyToken, getAllDiscountUsages);
router.get('/user-usages/:userId', userUsages);

export default router;