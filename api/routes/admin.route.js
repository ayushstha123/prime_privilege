const express = require('express');
const { getAllUsers } = require('../controllers/admin.controller.js');
const { verifyToken } = require('../utils/verifyUser.js');

const router = express.Router();

// Protected route accessible only to admin users
router.get('/alluser', verifyToken, (req, res, next) => {
    getAllUsers(req, res, next);
});

module.exports = router;
