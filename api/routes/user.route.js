const express = require('express');
const {
  test,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller.js');
const { verifyToken } = require('../utils/verifyUser.js');

const router = express.Router();

router.get('/', test);
router.get('/usernames',getAllUsers);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router