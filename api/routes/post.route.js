import express from "express";
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletePosts, getApprovedPosts, getPosts, likes, updatePost, updateStatus, views } from "../controllers/post.controller.js";

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getposts', getPosts);
router.get('/getapprovedposts', getApprovedPosts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletePosts);
router.put('/updatepost/:postId/:userId', verifyToken, updatePost);
router.put('/update-status/:postId/:userId', verifyToken, updateStatus);
router.put('/likes/:postId', verifyToken, likes);
router.put('/views/:postId', verifyToken, views);


export default router;
