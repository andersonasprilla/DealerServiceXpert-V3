import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import Customer from '../models/customerModel.js';

router.get('/', asyncHandler(async (req, res) => {
    const customers = await Customer.find({});
    res.json(customers);
    }));

router.get('/:id', asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
    }
));

export default router;