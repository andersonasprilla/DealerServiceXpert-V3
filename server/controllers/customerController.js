import asyncHandler from "../middleware/asyncHandler.js";
import Customer from "../models/customerModel.js";
import { protect } from '../middleware/authMiddleware.js';

// @desc    Fetch all customers
// @route   GET /api/customers
// @access  Private
const getCustomers = [
    protect,
    asyncHandler(async (req, res) => {
        const customers = await Customer.find({ user: req.user._id });

        if (customers.length > 0) {
            res.status(200).json(customers);
        } else {
            res.status(404).json({ message: 'No customers found' });
        }
    })
];

// @desc    Fetch single customer
// @route   GET /api/customers/:id
// @access  Private
const getCustomerById = [
    protect,
    asyncHandler(async (req, res) => {
        const customer = await Customer.findOne({ _id: req.params.id, user: req.user._id });

        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    })
];

// @desc    Create a customer
// @route   POST /api/customers
// @access  Private
const createCustomer = [
    protect,
    asyncHandler(async (req, res) => {
        const { hatNumber, repairOrder, customerName, vehicle, description, contact, priority } = req.body;

        const customer = await Customer.create({
            user: req.user._id,
            hatNumber,
            repairOrder,
            customerName,
            vehicle,
            description,
            contact,
            priority: priority || req.user.priority,
            status: req.user.status,
        });

        if (customer) {
            res.status(201).json(customer);
        } else {
            res.status(400).json({ message: 'Invalid customer data' });
        }
    })
];

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Private
const updateCustomer = [
    protect,
    asyncHandler(async (req, res) => {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            res.status(404).json({ message: 'Customer not found' });
            return;
        }

        customer.hatNumber = req.body.hatNumber || customer.hatNumber;
        customer.repairOrder = req.body.repairOrder || customer.repairOrder;
        customer.customerName = req.body.customerName || customer.customerName;
        customer.vehicle = req.body.vehicle || customer.vehicle;
        customer.description = req.body.description || customer.description;
        customer.contact = req.body.contact || customer.contact;
        customer.priority = req.body.priority || customer.priority;
        customer.status = req.body.status || customer.status;

        const updatedCustomer = await customer.save();
        res.status(200).json(updatedCustomer);
    })
];

export { getCustomers, getCustomerById, createCustomer, updateCustomer };
