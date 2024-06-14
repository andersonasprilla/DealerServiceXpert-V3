import jwt from 'jsonwebtoken';
import asyncHandler from  './asyncHandler.js';
import User from '../models/userModel.js';

// Protect routes
 const protect = asyncHandler(async (req, res, next) => {
    let token;

    //Read the JWT from the cookie
    token = req.cookies.jwt;

    //Make sure token exists
    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }else {
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