const User = require("../models/user.model.js");
const errorHandler = require("../utils/error.js");

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        if (!users || users.length === 0) {
            return errorHandler(404, "No users found");
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};
