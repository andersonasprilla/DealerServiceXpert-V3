import jwt from 'jsonwebtoken';
import asyncHandler from  './asyncHandler.js';
import User from '../models/userSchema.js';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;
    let refreshToken = req.cookies.refreshToken;

    // Check if access token exists and is valid
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            return next();
        } catch (error) {
            console.error('Access token verification failed:', error.message);
        }
    }

    // Check if refresh token exists and is valid
    if (refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');

            // Generate a new access token
            const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, {
                expiresIn: '2h',
            });

            // Set the new access token as an Http-Only cookie
            res.cookie('jwt', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 2 * 60 * 60 * 1000,
            });

            return next();
        } catch (error) {
            console.error('Refresh token verification failed:', error.message);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Manager middleware
const manager = (req, res, next) => {
    if(req.user && req.user.role === 'Manager') {
        
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as a Manager');
    }
}


export { protect, manager }; 