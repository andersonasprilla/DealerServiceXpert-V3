import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find the user in the database by email
    const user = await User.findOne({ email });

    // Check if user exists and the password is correct
    const doPasswordsMatch = await user.matchPassword(password);//await in if is not good practice. Extract that in variable
    if (!user || !doPasswordsMatch) {
    // If authentication fails, send a 401 status and an error message
    res.status(401);
    throw new Error('Invalid email or password');
    }
    // Generate a JWT token with the user ID as payload
    generateToken(res, user._id);
    // Send back user information (excluding sensitive data)
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
const logoutUser = asyncHandler(async (req, res) => {
    // Set the JWT cookie to an empty string and expire it immediately
    res.cookie('jwt', '', {
        httpOnly: true, // Cookie is accessible only by the web server
        expires: new Date(0), // Expire the cookie immediately
    });
    //if we want to delete many cookies, how we gonna do that?
    //there is a method to clear all cookies

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
    // Find all users and exclude the customers and password from the response
    const users = await User.find({}).select('-customers').select('-password');
    if (users) {
        res.status(200).json(users);
    } else {
        res.status(404);
        throw new Error('No users found');
    }
});

// @desc    Get user by ID  
// @route   GET /api/users/:id
// @access  Private/Manager
const getUserById = asyncHandler(async (req, res) => {
    // Find the user by ID and exclude the password from the response
    const user = await User.findById(req.params.id).select('-password');;

    // If the user exists, send back the user information
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user 
// @route   PUT /api/users/:id
// @access  Private/Manager
const updateUser = asyncHandler(async (req, res) => {
    // Find the user by ID
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // If the user exists, update the user information
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    // Save the updated user information
    const updatedUser = await user.save();

    // Send back the updated user information
    res.status(200).json({
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
    });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Manager
const deleteUser = asyncHandler(async (req, res) => {
    // Find the user by ID
    const user = await User.findById(req.params.id);

    // If the user does not exists 
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Delete the user
    await User.findByIdAndDelete(req.params.id);

    // Send a success response
    res.status(200).json({ message: 'User removed' });
    
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