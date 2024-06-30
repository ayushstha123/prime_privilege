const express = require('express');
const {
  test,
  getAllUsers,
  updateUser,
  deleteUser,
  getUsers,
  updateRole,
  resetPassword,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.get('/usernames',getAllUsers);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/getusers',verifyToken,getUsers);
router.put('/update-role/:id',verifyToken,updateRole);
router.put('/reset_password/:id/:token', resetPassword);

module.exports= router;
