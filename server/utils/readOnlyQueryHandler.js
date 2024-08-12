// Importing necessary modules and middleware
import asyncHandler from "../middleware/asyncHandler.js";
import { protect } from '../middleware/authMiddleware.js';
import { getPaginationParams, getPaginationMetadata } from './paginationUtils.js';
import buildQuery from './queryBuilder.js';

// Function to create a read-only query handler for a given Mongoose model
const readOnlyQueryHandler = (Model, options = {}) => {
  // Destructuring options with default values
  const {
    populateFields = [],
    searchFields = [],
    sortOptions = { createdAt: -1 },
    preQueryMiddleware = [],
    select = '' // New option for fields to select/exclude
  } = options;

  return [
    protect, // Middleware to protect the route
    ...preQueryMiddleware, // Additional middleware specified in options
    asyncHandler(async (req, res) => {
      
      // Extracting and removing pagination and sort parameters from the query
      const filteredParams = { ...req.query };
      delete filteredParams.page;
      delete filteredParams.limit;
      delete filteredParams.sort;
      delete filteredParams.search;

      // If no query parameters are provided, return empty result set
      if (Object.keys(filteredParams).length === 0 && !req.query.search) {
        return res.status(200).json({
          results: [],
          totalPages: 0,
          currentPage: 1,
          totalResults: 0,
        });
      }

      // Extract pagination parameters from the request query
      const { page, limit, skip } = getPaginationParams(req.query);
      // Build the query using the filtered parameters
      let query = buildQuery(filteredParams, searchFields);

      // Apply search functionality if searchFields are defined and search query is provided
      if (req.query.search && searchFields.length > 0) {
        const searchRegex = new RegExp(req.query.search, 'i');
        const searchQuery = searchFields.map(field => ({ [field]: searchRegex }));
        query = { ...query, $or: searchQuery };
      }

      // Count the total number of documents matching the query
      const total = await Model.countDocuments(query);
      let queryBuilder = Model.find(query);

      // Apply field selection or exclusion
      if (select) {
        queryBuilder = queryBuilder.select(select);
      }

      // Apply population with field selection if specified
      populateFields.forEach(populate => {
        if (typeof populate === 'string') {
          queryBuilder = queryBuilder.populate(populate);
        } else if (typeof populate === 'object' && populate.path) {
          queryBuilder = queryBuilder.populate({
            path: populate.path,
            select: populate.select
          });
        }
      });

      // Apply sorting based on request query or default options
      const sort = req.query.sort ? JSON.parse(req.query.sort) : sortOptions;
      queryBuilder = queryBuilder.sort(sort);

      // Apply pagination by limiting and skipping results
      queryBuilder = queryBuilder.limit(limit).skip(skip);

      // Execute the query and get the results
      const results = await queryBuilder;

      // Get pagination metadata
      const paginationMetadata = getPaginationMetadata(page, limit, total);

      // Send the results along with pagination metadata as the response
      res.status(200).json({
        results,
        ...paginationMetadata
      });
    })
  ];
};

export default readOnlyQueryHandler;
