import mongoose from "mongoose";
import capitalizeName from "../middleware/capitalizeName.js";

const customerSchema = new mongoose.Schema({

    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    hatNumber: {
        required: true,
        type: String,
        match: [/^\d{4}$/, 'Must be a 4-digit number']
    },
    repairOrder: {
        required: true,
        type: String,
        match: [/^\d{6}$/, 'Must be a 6-digit number']
    },
    customerName: {
        required: true,
        type: String,
        set: capitalizeName
    },
    vehicle: {
        required: true,
        type: String,
        set: capitalizeName
    },
    description: {
        required: true,
        type: String,
    },
    contact: {
        required: true,
        type: String,
        match: [/^\(\d{3}\)-\d{3}-\d{4}$/, 'Must match the format (xxx)-xxx-xxxx']
    },
    priority: {
        required: true,
        type: String,
        enum: ['Drop Off', 'Waiter'],
        default: 'Drop Off',
    },
    status: {
        required: true,
        type: String,
        enum: ['Checked In!', 'Finished', 'Special Order', 'Back Order'],
        default: 'Checked In!',
    },

}, { timestamps: true, versionKey: false }); 

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;

