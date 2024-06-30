import express from 'express';
import {
    test,
  updateUser,
  deleteUser,
  getUsers,
  updateRole,
  resetPassword,
} from '../controllers/business.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

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

export default router;