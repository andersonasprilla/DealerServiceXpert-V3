import RepairOrder from "../models/repairOrderSchema.js";
import readOnlyQueryHandler from "../utils/readOnlyQueryHandler.js";

// @desc    Query repair orders
// @route   GET /api/repair-orders
// @access  Private
const queryRepairOrders = readOnlyQueryHandler(RepairOrder, {
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

export { queryRepairOrders };
