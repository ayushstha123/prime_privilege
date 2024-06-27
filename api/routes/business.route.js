const express = require('express');
const {
  test,
  updateUser,
  deleteUser,
  getUsers,
  updateRole,
  resetPassword,
} = require('../controllers/business.controller.js');
const { verifyToken } = require('../utils/verifyUser.js');
const {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} = require('../controllers/product.controller.js');

const router = express.Router();
router.get('/', test);
router.post('/update/:id', verifyToken, updateUser);
router.post('/create-product',verifyToken, createProduct);
router.get('/get-product/:id',verifyToken, getProducts);
router.post('/update-product/:id',verifyToken, updateProduct);
router.delete('/delete-product/:id',verifyToken, deleteProduct);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/getusers',verifyToken,getUsers);
router.put('/update-role/:id',verifyToken,updateRole);
router.put('/reset_password/:id/:token', resetPassword);

module.exports= router;