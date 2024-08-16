import Customer from "../models/customerSchema.js";
import createGenericQueryHandler from "../utils/createGenericQueryHandler.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Query customers
// @route   GET /api/customers
// @access  Private
const queryCustomers = createGenericQueryHandler(Customer, {
  // Specify fields to populate in the resulting documents
  populateFields: [],

  // Define fields that are searchable in the query
  searchFields: ['firstName', 'lastName', 'vehicle', 'phone'],

  // Set default sorting options, sorting by last name, then first name in ascending order
  sortOptions: { lastName: 1, firstName: 1 },

  // Include any additional middleware functions to be run before the query
  preQueryMiddleware: []
});

// @desc    Create a new customer
// @route   POST /api/customers
// @access  Private
const createCustomer = asyncHandler(async (req, res) => {
  const { firstName, lastName, vehicle, phone } = req.body;

  const customer = await Customer.create({
    firstName,
    lastName,
    vehicle,
    phone
  });

  if (customer) {
    res.status(201).json(customer);
  } else {
    res.status(400);
    throw new Error('Invalid customer data');
  }
});

// @desc    Get customer by ID
// @route   GET /api/customers/:id
// @access  Private
const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    res.json(customer);
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Private
const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    customer.firstName = req.body.firstName || customer.firstName;
    customer.lastName = req.body.lastName || customer.lastName;
    customer.vehicle = req.body.vehicle || customer.vehicle;
    customer.phone = req.body.phone || customer.phone;

    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
// @access  Private
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    await customer.remove();
    res.json({ message: 'Customer removed' });
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});

export { queryCustomers, createCustomer, getCustomerById, updateCustomer, deleteCustomer };
