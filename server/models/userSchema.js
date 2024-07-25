import mongoose from "mongoose";
import capitalizeName from "../middleware/capitalizeName.js";
import argon2 from 'argon2'; 

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true,
        set: capitalizeName
    },
    email: {
        required: true,
        type: String,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
        required: true,
        type: String,
        minlength: 6,
    },
    role: {
        type: String,
        required: true,
        enum: ['Service Advisor', 'Manager', "Technician", "Parts Specialist"],
    },
    
}, { timestamps: true, versionKey: false });

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await argon2.verify(this.password, enteredPassword);
};

// Middleware to hash the password before saving a user document
userSchema.pre('save', async function (next) {
    // If the password field is not modified, move to the next middleware
    if (!this.isModified('password')) {
        return next();
    }
    
    try {
        // Hash the password using argon2
        this.password = await argon2.hash(this.password);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', userSchema, 'users');

export default User;
