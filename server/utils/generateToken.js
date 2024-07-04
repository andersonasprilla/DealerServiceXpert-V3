import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (res, userId) => {
    // // Debugging logs
    // console.log('JWT_SECRET:', process.env.JWT_SECRET);
    // console.log('JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET);

    // Generate an access token with the user ID as payload
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '2h', // Token expires in 2 hours
    });

    // Generate a refresh token with the user ID as payload
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '12h', // Token expires in 12 hours
    });

    // Set the access token as an Http-Only cookie
    res.cookie('jwt', accessToken, {
        httpOnly: true, // Cookie is accessible only by the web server
        secure: process.env.NODE_ENV !== 'development', // Use secure flag in production
        sameSite: 'strict', // Prevents the browser from sending this cookie along with cross-site requests
        maxAge: 2 * 60 * 60 * 1000, // Cookie expires in 2 hours
    });

    // Set the refresh token as an Http-Only cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true, // Cookie is accessible only by the web server
        secure: process.env.NODE_ENV !== 'development', // Use secure flag in production
        sameSite: 'strict', // Prevents the browser from sending this cookie along with cross-site requests
        maxAge: 12 * 60 * 60 * 1000, // Cookie expires in 12 hours
    });
};

export default generateToken;
