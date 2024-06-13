import mongoose, { version } from "mongoose";
import capitalizeName from "../middleware/capitalizeName.js";

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

const User = mongoose.model('User', userSchema);

export default User;