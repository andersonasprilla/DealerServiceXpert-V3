import mongoose from "mongoose";

const specialOrdersSchema = new mongoose.Schema({
    partNumber: {
        required: true,
        type: String,
    },
    partDescription: {
        required: true,
        type: String,
    },
    quantity: {
        required: true,
        type: Number,
    },
    price: {
        required: true,
        type: Number,
    },
    }, { timestamps: true, versionKey: false });

const SpecialOrder = mongoose.model('SpecialOrder', specialOrdersSchema, 'special-orders');

export default SpecialOrder;