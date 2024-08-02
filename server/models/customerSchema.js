import mongoose from 'mongoose';
import capitalizeName from '../utils/capitalizeName.js';

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
        match: [/^\d{10}$/, 'Must be a 10-digit number ']
    },
    vin: {
        type: String,
        required: true,
        match: [/^[A-HJ-NPR-Z0-9]{17}$/, 'Must be a 17-character alphanumeric string']
    },
}, { timestamps: true, versionKey: false, strictPopulate: false});

const Customer = mongoose.model('Customer', customerSchema, 'customers');

export default Customer;