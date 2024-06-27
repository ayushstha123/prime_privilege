const express = require('express');
const {
  test,
  updateUser,
  deleteUser,
  getUsers,
  updateRole,
  resetPassword,
} = require('../controllers/user.controller.js');
const { verifyToken } = require('../utils/verifyUser.js');

const router = express.Router();

router.get('/', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/getusers',verifyToken,getUsers);
router.put('/update-role/:id',verifyToken,updateRole);
router.put('/reset_password/:id/:token', resetPassword);

module.exports= router;
