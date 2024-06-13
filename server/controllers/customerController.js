import asyncHandler from "../middleware/asyncHandler.js";
import Customer from "../models/customerModel.js";

// @desc    Fetch all customers
// @route   GET /api/customers
// @access  Public
const getCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.find({});
    res.json(customers);
});

// @desc    Fetch single customer
// @route   GET /api/customers/:id
// @access  Public
const getCustomerById = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if(customer) {
        return res.json(customer);
    } else {
        res.status(404)
        throw new Error('Resource not found');
    }
});

export { getCustomers, getCustomerById };