import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find the user in the database by email
    const user = await User.findOne({ email });

    // Check if user exists and the password is correct
    if (user && (await user.matchPassword(password))) {
        // Generate a JWT token with the user ID as payload
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '12h', // Token expires in 12 hours
        });
        // Set the JWT as an Http-Only cookie
        res.cookie('jwt', token, {
            httpOnly: true, // Cookie is accessible only by the web server
            secure: process.env.NODE_ENV !== 'development', // Use secure flag in production
            sameSite: 'strict', // Prevents the browser from sending this cookie along with cross-site requests
            maxAge: 43200000, // Cookie expires in 12 hours
        });
        // Send back user information (excluding sensitive data)
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } else {
        // If authentication fails, send a 401 status and an error message
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    // Set the JWT cookie to an empty string and expire it immediately
    res.cookie('jwt', '', {
        httpOnly: true, // Cookie is accessible only by the web server
        expires: new Date(0), // Expire the cookie immediately
    });

    // Send a success response indicating the user has been logged out
    res.status(200).json({ message: 'Logged out successfully' });
});


// @desc    Register a new user
// @route   POST /api/users
// @access  Private/Manager
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create a new user
    const user = await User.create({
        username,
        email,
        password,
        role,
    });

    // If the user is created successfully, send back the user information
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