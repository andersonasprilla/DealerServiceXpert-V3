import asyncHandler from "../middleware/asyncHandler.js";
import Customer from "../models/customerModel.js";

// @desc    Fetch all customers
// @route   GET /api/customers
// @access  Private
const getCustomers = asyncHandler(async (req, res) => {
    res.send('Get all customers');
});

// @desc    Fetch single customer
// @route   GET /api/customers/:id
// @access  Private
const getCustomerById = asyncHandler(async (req, res) => {
    res.send('Get a customer by id');
});

// @desc    Create a customer
// @route   POST /api/customers
// @access  Private
const createCustomer = asyncHandler(async (req, res) => {
    res.send('Create a customer');
});

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Private
const updateCustomer = asyncHandler(async (req, res) => {
    res.send('Update a customer');
});

export { getCustomers, getCustomerById, createCustomer, updateCustomer };