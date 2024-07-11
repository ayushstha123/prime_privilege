const Post = require('../models/post.model.js');
const { errorHandler } = require('../utils/error.js');

exports.create = async (req, res, next) => {
    try {
        const isBusiness = req.user && req.user.role === 'business'; // Check if the user is an admin

        if (isBusiness) {
            const { name, description, category, imageUrl, address, socialMedia } = req.body;
            if (!name || !description || !category || !imageUrl || !address || !socialMedia) {
                return next(errorHandler(400, "All fields are required"));
            }
            const slug = name.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
            const newPost = new Post({
                ...req.body,
                slug,
                image: imageUrl,
                userId: req.user.id,
            });
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        }
        return next(errorHandler(403, "You are not allowed to create posts"));


    } catch (error) {
        next(error);
    }
};


//get posts whose status is posted
exports.getApprovedPosts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex || 0);
        const limit = parseInt(req.query.limit || 10);
        const sortDirection = req.query.order === 'asc' ? 1 : -1; // Corrected sort direction

        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.address && { slug: req.query.address }),
            ...(req.query.socialMedia && { slug: req.query.socialMedia }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { postId: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                  { name: { $regex: req.query.searchTerm, $options: 'i' } },
                  { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
            status: 'posted' // Filter posts by status 'posted'
        }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

        const totalPosts = await Post.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
        );
        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });
        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        });
    } catch (error) {
        next(error);
    }
};

exports.getPosts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex || 0);
        const limit = parseInt(req.query.limit || 10);
        const sortDirection = req.query.order === 'asc' ? 1 : -1; // Corrected sort direction
        
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.address && { slug: req.query.address }),
            ...(req.query.socialMedia && { slug: req.query.socialMedia }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { postId: req.query.postId }),
            ...(req.query.search && {
                $or: [
                    { name: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            })
        }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

        const totalPosts = await Post.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
        );
        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });
        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        });
    } catch (error) {
        next(error);
    }
};


exports.updateStatus = async (req, res, next) => {
    try {
        const isAdmin = req.user && req.user.role === 'admin'; // Check if the user is a admin
        const isSuperAdmin = req.user && req.user.role === 'superAdmin'; // Check if the user is a superadmin

        if (!isAdmin && !isSuperAdmin) {
            return next(errorHandler(403, "You are not allowed to update post status"));
        }

        const post = await Post.findById(req.params.postId);
        if (!post) {
            return next(errorHandler(404, 'Post not found'));
        }

        post.status=req.body.newStatus;
        await post.save();

        res.status(200).json({ message: 'Post status updated successfully', post });
    } catch (error) {
        next(error);
    }
};

exports.deletePosts = async (req, res, next) => {
    try {
        const isAdmin = req.user && req.user.role === 'admin'; // Check if the user is a superadmin
        const isOwner = req.user && req.user.id === req.params.userId;

        if (!isOwner && !isAdmin) {
            return next(errorHandler(403, "You are not allowed to delete this post"));
        }
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json("The post has been deleted successfully");
    } catch (error) {
        next(error);
    }
};


exports.updatePost = async (req, res, next) => {
    const isAdmin = req.user && req.user.role === 'admin';
    const isBusiness = req.user && req.user.role === 'business';

    if (!isAdmin && !isBusiness) {
        return next(errorHandler(403, "You are not allowed to update posts"));
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    address: req.body.address,
                    socialMedia: req.body.socialMedia,
                    category: req.body.category,
                    image: req.body.image,
                }
            },
            { new: true }
        );

        if (!updatedPost) {
            return next(errorHandler(404, "Post not found"));
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
};

exports.likes = async (req, res) => {
    try {
        const postId = req.params.postId; // Assuming postId is sent in the request params
        const userId = req.query.userId;

        // Check if userId is already in the likes array of the post
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const likedIndex = post.likes.indexOf(userId);

        if (likedIndex !== -1) {
            // If userId is already in the likes array, remove it
            post.likes.splice(likedIndex, 1);
        } else {
            // If userId is not in the likes array, add it
            post.likes.push(userId);
        }

        // Save the updated post
        const updatedPost = await post.save();

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
};

exports.views = async (req, res) => {
    try {
        const postId = req.params.postId; // Assuming postId is sent in the request params
        const userId = req.query.userId;

        // Check if userId is already in the likes array of the post
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const viewIndex = post.views.indexOf(userId);
        if (viewIndex !== -1) {
            // If userId is already in the likes array, remove it
            post.likes.splice(viewIndex, 1);
        } else {
            // If userId is not in the likes array, add it
            post.views.push(userId);
        }

        // Save the updated post
        const updatedPost = await post.save();

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
};