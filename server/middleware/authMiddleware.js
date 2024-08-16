import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userSchema.js';
import { getPermissionsForRole } from '../utils/roles.js';
import { ApiError } from './errorMiddleware.js';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;
    let refreshToken = req.cookies.refreshToken;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            req.userPermissions = getPermissionsForRole(req.user.role);
            return next();
        } catch (error) {
            console.error('Access token verification failed:', error.message);
        }
    }

    if (refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            req.userPermissions = getPermissionsForRole(req.user.role);

            // Generate a new access token
            const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, {
                expiresIn: '2h',
            });

            res.cookie('jwt', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 2 * 60 * 60 * 1000,
            });

            return next();
        } catch (error) {
            console.error('Refresh token verification failed:', error.message);
        }
    }

    throw new ApiError(401, 'Not authorized, no token');
});

// Role-based authorization
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new ApiError(403, `Not authorized as ${roles.join(' or ')}`);
        }
        next();
    };
};

// Permission-based authorization
const requirePermission = (permission) => {
    return (req, res, next) => {
        if (!req.user || !req.userPermissions.includes(permission)) {
            throw new ApiError(403, `You don't have permission to perform this action`);
        }
        next();
    };
};

export { protect, authorize, requirePermission };