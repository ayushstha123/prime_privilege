import Business from '../models/business.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const test = (req, res) => {
    res.json({
      message: 'API is working!', 
    });
  };
// update user
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await Business.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    phoneNum: req.body.phoneNum,
                    document: req.body.document,
                    address: req.body.address,
                    description: req.body.description,
                    socialMedia:req.body.socialMedia,
                    category:req.body.category,
                    profilePicture: req.body.profilePicture,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};


// delete user
export const deleteUser = async (req, res, next) => {
    if (!req.user.role === 'admin' && req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can delete only your account!'));
    }
    try {
        await Business.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...');
    } catch (error) {
        next(error);
    }
}
export const getUsers=async(req,res,next)=>{
    try {
      const isAdmin = req.user && req.user.role === 'admin'; // Check if the user is an admin
      const isSuperAdmin = req.user && req.user.role === 'superAdmin'; // Check if the user is an admin
    
    
      if (isAdmin || isSuperAdmin) {
        const startIndex=parseInt(req.query.startIndex)||0;
      const limit=parseInt(req.query.limit)||10;
      const sortDirection=req.query.sort ==='asc' ? 1 :-1;
      const users=await Business.find()
      .sort({createdAt:sortDirection})
      .skip(startIndex)
      .limit(limit);
    
      const now=new Date();
      const oneMonthAgo=new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
      );
    
      const usersWithoutPassword=users.map((user)=>{
        const {password,...rest}=user._doc;
        return rest;
      });
      const totalUsers = await Business.countDocuments();
      const lastMonthUsers=await Business.countDocuments({
        createdAt:{$gte:oneMonthAgo}
      });
    
    
    
    
      res.status(200).json({
        users:usersWithoutPassword,
        totalUsers,
        lastMonthUsers,
      })
      }
            return next(errorHandler(403, "You are not allowed to see users"));
    
    } catch (error) {
      next(error);
    }
    }
export const getBusinessUsers = async (req, res, next) => {
    try {
        const isAdmin = req.user && req.user.role === 'admin'; // Check if the user is an admin
        const isSuperAdmin = req.user && req.user.role === 'superAdmin'; // Check if the user is an admin
        if (isAdmin || isSuperAdmin) {
            const startIndex = parseInt(req.query.startIndex) || 0;
            const limit = parseInt(req.query.limit) || 10;
            const sortDirection = req.query.sort === 'asc' ? 1 : -1;
            const users = await Business.find()
                .sort({ createdAt: sortDirection })
                .skip(startIndex)
                .limit(limit);

            const now = new Date();
            const oneMonthAgo = new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                now.getDate()
            );

            const usersWithoutPassword = users.map((user) => {
                const { password, ...rest } = user._doc;
                return rest;
            });
            const totalUsers = await Business.countDocuments();
            const lastMonthUsers = await Business.countDocuments({
                createdAt: { $gte: oneMonthAgo }
            });

            res.status(200).json({
                users: usersWithoutPassword,
                totalUsers,
                lastMonthUsers,
            })
        }
        return next(errorHandler(403, "You are not allowed to see users"));


    } catch (error) {
        next(error);
    }
}

export const updateRole = async (req, res, next) => {
    const isAdmin = req.user && req.user.role === 'admin'; // Check if the user is an admin
    const isSuperAdmin = req.user && req.user.role === 'superAdmin'; // Check if the user is an admin

    try {
        const user = await Business.findById(req.params.id); // Assuming userId is passed in the request params
        if (!user) {
            return next(errorHandler(401, 'User not found !'));

        }

        // Check if the authenticated user is neither an admin nor a superadmin
        if (!isAdmin && !isSuperAdmin) {
            return next(errorHandler(403, 'Only admins or superadmins can update user roles'));

        }

        // Assuming newRole is provided in the request body
        user.role = req.body.newRole;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'User role updated successfully', user });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        try {
            // Hash the new password
            const hashedPassword = await bcryptjs.hash(password, 10);

            // Update the user's password
            await Business.findByIdAndUpdate(id, { password: hashedPassword });

            // Send success response
            res.status(200).json({ success: true, message: 'Password reset successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Something went wrong' });
        }
    });

};



