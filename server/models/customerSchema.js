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
    },
    vin: {
        type: String,
        required: false,
        unique: true,
        match: [/^[A-HJ-NPR-Z0-9]{17}$/, 'Please enter a valid VIN'] // Excludes I, O, Q characters from VIN
    }

}, { timestamps: true, versionKey: false });

const Customer = mongoose.model('Customer', customerSchema, 'customers');

export default Customer;