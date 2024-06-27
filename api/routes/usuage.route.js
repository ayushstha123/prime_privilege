const express = require('express');
const {
  addDiscountUsage,
  getAllDiscountUsages,
  getUsage,
  userUsages,
} = require('../controllers/usuage.controller.js');
const { verifyToken } = require('../utils/verifyUser.js');

const router = express.Router();

router.post('/create-usage',verifyToken, addDiscountUsage);
router.get('/get-usages/:businessId', verifyToken, getUsage);
router.get('/all-usages', verifyToken, getAllDiscountUsages);
router.get('/user-usages/:userId', userUsages);

module.exports= router;