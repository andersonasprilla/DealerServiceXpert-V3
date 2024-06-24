import asyncHandler from "../middleware/asyncHandler.js";
import Customer from "../models/customerModel.js";

// @desc    Fetch all customers
// @route   GET /api/customers
// @access  Private
const getCustomers = asyncHandler(async (req, res) => {
    // Find all customers that belong to the user
    const customers = await Customer.find({ user: req.user._id});

    // If customers exist, send back the customers
    if (customers) {
        res.status(200).json(customers);
    }
    else {
        res.status(404);
        throw new Error('No customers found');
    }

});

// @desc    Fetch single customer
// @route   GET /api/customers/:id
// @access  Private
const getCustomerById = asyncHandler(async (req, res) => {
    // Find the customer by ID that belongs to the user
    const customer = await Customer.findOne({ _id: req.params.id, user: req.user._id });

    // If the customer exists, send back the customer
    if (customer) {
        res.status(200).json(customer);
    }
    else {
        res.status(404);
        throw new Error('Customer not found');
    }
});

// @desc    Create a customer
// @route   POST /api/customers
// @access  Private
const createCustomer = asyncHandler(async (req, res) => {
    // Get the customer information from the request body
    const { hatNumber, repairOrder, customerName, vehicle, description, contact, priority } = req.body;

    // Create a new customer
    const customer = await Customer.create({
        user: req.user._id,
        hatNumber,
        repairOrder,
        customerName,
        vehicle,
        description,
        contact,
        // If the priority is not provided, use the user's priority
        priority: priority || req.user.priority,
        status: req.user.status,
      });
    if (!customer) {
        res.status(400);
        throw new Error('Invalid customer data');
    }
    // If the customer is created successfully, send back the customer information
    res.status(201).json(customer);
});

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Private
const updateCustomer = asyncHandler(async (req, res) => {
    // Find the customer by ID
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
        res.status(404);
        throw new Error('Customer not found');
    }

    // If the customer exists, update the customer information
    customer.hatNumber = req.body.hatNumber || customer.hatNumber;
    customer.repairOrder = req.body.repairOrder || customer.repairOrder;
    customer.customerName = req.body.customerName || customer.customerName;
    customer.vehicle = req.body.vehicle || customer.vehicle;
    customer.description = req.body.description || customer.description;
    customer.contact = req.body.contact || customer.contact;
    customer.priority = req.body.priority || customer.priority;
    customer.status = req.body.status || customer.status;

    // Save the updated customer information
    const updatedCustomer = await customer.save();
    res.status(200).json(updatedCustomer);
});

export { getCustomers, getCustomerById, createCustomer, updateCustomer };