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
    vehicle: {
        make: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
            min: 1960,
            max: 2100
        }
    }
}, { timestamps: true, versionKey: false, strictPopulate: false});

const Customer = mongoose.model('Customer', customerSchema, 'customers');

export default Customer;