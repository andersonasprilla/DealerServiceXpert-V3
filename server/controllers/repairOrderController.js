import RepairOrder from "../models/repairOrderSchema.js";
import createGenericQueryHandler from "../utils/createGenericQueryHandler.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Query repair orders
// @route   GET /api/repair-orders
// @access  Private
const queryRepairOrders = createGenericQueryHandler(RepairOrder, {
  // Specify fields to populate in the resulting documents
  populateFields: [
    { path: 'customer', select: 'firstName lastName vehicle phone -_id' }
  ],
  // Define fields that are searchable in the query
  searchFields: ['repairOrderNumber', 'hatNumber', 'user'],

  // Set default sorting options, sorting by creation date in descending order
  sortOptions: { createdAt: -1 },

  // Include any additional middleware functions to be run before the query
  preQueryMiddleware: []
});

// @desc    Create a new repair order
// @route   POST /api/repair-orders
// @access  Private
const createRepairOrder = asyncHandler(async (req, res) => {
  const { repairOrderNumber, hatNumber, customer, user, ...otherFields } = req.body;

  // Check if repair order already exists
  const existingRepairOrder = await RepairOrder.findOne({ repairOrderNumber });
  if (existingRepairOrder) {
    res.status(400);
    throw new Error('Repair order with this number already exists');
  }

  // Create a new repair order
  const repairOrder = new RepairOrder({
    repairOrderNumber,
    hatNumber,
    customer,
    user,
    ...otherFields
  });

  const createdRepairOrder = await repairOrder.save();

  res.status(201).json(createdRepairOrder);
});

// @desc    Update a repair order
// @route   PUT /api/repair-orders/:id
// @access  Private
const updateRepairOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Find the repair order by ID
  const repairOrder = await RepairOrder.findById(id);
  if (!repairOrder) {
    res.status(404);
    throw new Error('Repair order not found');
  }

  // Update repair order fields
  Object.assign(repairOrder, updateData);

  const updatedRepairOrder = await repairOrder.save();

  res.status(200).json(updatedRepairOrder);
});

// @desc    Delete a repair order
// @route   DELETE /api/repair-orders/:id
// @access  Private
const deleteRepairOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the repair order by ID
  const repairOrder = await RepairOrder.findById(id);
  if (!repairOrder) {
    res.status(404);
    throw new Error('Repair order not found');
  }

  // Remove the repair order
  await repairOrder.remove();

  res.status(200).json({ message: 'Repair order removed' });
});

export { 
  queryRepairOrders, 
  createRepairOrder, 
  updateRepairOrder, 
  deleteRepairOrder 
};
