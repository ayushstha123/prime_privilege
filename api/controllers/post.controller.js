import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create= async(req,res,next)=>{
    const isAdmin = req.user && req.user.role === 'admin'; // Check if the user is an admin
    if (!isAdmin) {
        return next(errorHandler(403, "You are not allowed to do that"));
    }

    if (!req.body.title || !req.body.description) {
        return next(errorHandler(400, "All fields are required"));
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(error){
     next(error);   
    }
}