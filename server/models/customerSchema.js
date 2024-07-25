import mongoose from 'mongoose';
import capitalizeName from '../middleware/capitalizeName.js';

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        set: capitalizeName
    },
    lastName: {
        type: String,
        required: true,
        set: capitalizeName
    },
    phone: {
        type: String,
        required: true,
        match: [/^\(\d{3}\)-\d{3}-\d{4}$/, 'Must match the format (xxx)-xxx-xxxx']
    }

}, { timestamps: true, versionKey: false });

const Customer = mongoose.model('Customer', customerSchema, 'customers');

export default Customer;