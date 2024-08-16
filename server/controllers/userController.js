import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userSchema.js";
import generateToken from "../utils/generateToken.js";
import createGenericQueryHandler from "../utils/createGenericQueryHandler.js";

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
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
    res.cookie('refreshToken', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Private/Manager
const registerUser = asyncHandler(async (req, res) => {
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
});



// @desc    Query users
// @route   GET /api/users
// @access  Private
const queryUsers = createGenericQueryHandler(User, {
    // Specify fields to populate in the resulting documents
    populateFields: [],
    // Define fields that are searchable in the query
    searchFields: ['username', 'email', 'role'],
    // Set default sorting options, sorting by username in ascending order
    sortOptions: { username: 1 },
    // Include any additional middleware functions to be run before the query
    preQueryMiddleware: [],
    // Specify fields to exclude from the query results
    select: ' -password -createdAt -updatedAt'
});



// @desc    Get current user
// @route   GET /api/users/me
// @access  Private
const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Manager
const updateUser = asyncHandler(async (req, res) => {
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
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
    });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Manager
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    await User.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: 'User removed' });
});

export {
    loginUser,
    logoutUser,
    registerUser,
    queryUsers,
    updateUser,
    deleteUser,
    getCurrentUser,
};  
