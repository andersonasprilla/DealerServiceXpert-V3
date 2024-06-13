import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";


// @desc    Fetch all users
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Fetch single user
// @route   GET /api/users/:id
// @access  Public
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user) {
        return res.json(user);
    } else {
        res.status(404)
        throw new Error('Resource not found');
    }
});

export { getUsers, getUserById };