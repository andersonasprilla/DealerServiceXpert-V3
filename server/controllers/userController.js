import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '12h',
        });

        //Set JWT as Http-Only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 43200000, //12 hours
        });

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Logged out successfully' })
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Private/Manager
const registerUser = asyncHandler(async (req, res) => {
    res.send('Register Route');
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/Manager
const getUsers = asyncHandler(async (req, res) => {
    res.send('Get Users Route');
});

// @desc    Get user by ID  
// @route   GET /api/users/:id
// @access  Private/Manager
const getUserById = asyncHandler(async (req, res) => {
    res.send('Get User by ID Route');
});

// @desc    Update user 
// @route   PUT /api/users/:id
// @access  Private/Manager
const updateUser = asyncHandler(async (req, res) => {
    res.send('Update User Route');
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Manager
const deleteUser = asyncHandler(async (req, res) => {
    res.send('Delete User Route');
});

export { 
    loginUser, 
    logoutUser, 
    registerUser, 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser
};