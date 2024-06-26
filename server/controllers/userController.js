import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { protect, manager } from '../middleware/authMiddleware.js';

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const doPasswordsMatch = await user.matchPassword(password);
    if (!user || !doPasswordsMatch) {
        res.status(401);
        throw new Error('Invalid email or password');
    }
    generateToken(res, user._id);
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    });
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = [protect, asyncHandler(async (req, res) => {
    Object.keys(req.cookies).forEach(cookieName => {
        res.cookie(cookieName, '', {
            httpOnly: true,
            expires: new Date(0),
        });
    });
    res.status(200).json({ message: 'Logged out successfully' });
})];

// @desc    Register a new user
// @route   POST /api/users
// @access  Private/Manager
const registerUser = [protect, manager, asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({ username, email, password, role });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})];

// @desc    Get users
// @route   GET /api/users
// @access  Private/Manager
const getUsers = [protect, manager, asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-customers -password');
    if (users) {
        res.status(200).json(users);
    } else {
        res.status(404);
        throw new Error('No users found');
    }
})];

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Manager
const getUserById = [protect, manager, asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})];

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Manager
const updateUser = [protect, manager, asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();

    res.status(200).json({
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
    });
})];

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Manager
const deleteUser = [protect, manager, asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'User removed' });
})];

export {
    loginUser,
    logoutUser,
    registerUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
