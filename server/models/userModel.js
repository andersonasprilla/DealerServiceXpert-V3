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

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;