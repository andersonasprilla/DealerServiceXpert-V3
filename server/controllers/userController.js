import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    res.send('Login Route');
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('Logout Route');
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