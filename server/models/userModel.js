import mongoose from "mongoose";
import capitalizeName from "../middleware/capitalizeName.js";
import bcrypt from "bcryptjs";

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
    customers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    }],

}, { timestamps: true, versionKey: false });

// Method to compare entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);//brcypt is abandoned, should use argon2
};

// Middleware to hash the password before saving a user document
userSchema.pre('save', async function (next) {
    // If the password field is not modified, move to the next middleware
    if (!this.isModified('password')) {
        next();
    }
    // Generate a salt for hashing the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;