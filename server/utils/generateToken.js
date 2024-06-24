import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    // Generate a JWT token with the user ID as payload
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn : '12h', // Token expires in 12 hours
    });
    // Set the JWT as an Http-Only cookie
    res.cookie('jwt', token, {
        httpOnly : true, // Cookie is accessible only by the web server
        secure : process.env.NODE_ENV !== 'development', // Use secure flag in production
        sameSite : 'strict', // Prevents the browser from sending this cookie along with cross-site requests
        maxAge : 43200000, // Cookie expires in 12 hours
    });
    //this IS MUST
    //there should be access token, like this one that you created, and refresh token, who is similar to this one
    //but have longer lifetime
}

export default generateToken;