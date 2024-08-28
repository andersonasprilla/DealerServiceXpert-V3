import asyncHandler from "../middleware/asyncHandler.js";
import { protect } from '../middleware/authMiddleware.js';
import { getPaginationParams, getPaginationMetadata } from './paginationUtils.js';
import buildQuery from './queryBuilder.js';

// Generic query handler for GET requests
// This function creates a reusable handler for GET requests with pagination, sorting, and filtering
const createGenericQueryHandler = (Model, options = {}) => {
  return [
    protect, // Middleware to ensure the route is protected
    ...options.preQueryMiddleware || [], // Any additional middleware specified in options
    asyncHandler(async (req, res) => {
      // Extract pagination parameters from the request query
      const { page, limit, skip } = getPaginationParams(req.query);

      // Build the query based on request parameters and allowed search fields
      const query = buildQuery(req.query, options.searchFields || []);
      
      // Count total documents matching the query for pagination metadata
      const total = await Model.countDocuments(query);

      // Start building the query
      let queryBuilder = Model.find(query);
      
      // Apply field selection if specified in options
      if (options.select) {
        queryBuilder = queryBuilder.select(options.select);
      }
      
      // Apply population of related documents if specified in options
      if (options.populateFields) {
        options.populateFields.forEach(populate => {
          queryBuilder = queryBuilder.populate(populate);
        });
      }
      
      // Apply sorting based on request query or default options
      const sort = req.query.sort ? JSON.parse(req.query.sort) : options.sortOptions || { createdAt: -1 };
      queryBuilder = queryBuilder.sort(sort).limit(limit).skip(skip);
      
      // Execute the query
      const results = await queryBuilder;

      // Generate pagination metadata
      const paginationMetadata = getPaginationMetadata(page, limit, total);
      
      // Send the response with results and pagination metadata
      res.status(200).json({
        results,
        ...paginationMetadata
      });
    })
  ];
};


export default createGenericQueryHandler;
