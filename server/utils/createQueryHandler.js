import asyncHandler from "../middleware/asyncHandler.js";
import { protect } from '../middleware/authMiddleware.js';

// Define a function to create a query handler middleware
const createQueryHandler = (Model, allowedFields, customFilters = {}) => {
    return [
        // Apply the protect middleware to ensure the user is authenticated
        protect,
        // Use asyncHandler to catch any errors and pass them to the error handler
        asyncHandler(async (req, res) => {
            // Parse pagination parameters from query string, with defaults
            const page = parseInt(req.query.page, 10) || 1;
            const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50);
            const startIndex = (page - 1) * limit;

            // Initialize the query object with the user ID
            let query = { user: req.user._id };

            // Iterate through query parameters to build the query object
            for (const [key, value] of Object.entries(req.query)) {
                // Check if the field is allowed and the value is not empty
                if (allowedFields.includes(key) && value.trim()) {
                    // If a custom filter function is provided, use it
                    if (customFilters[key]) {
                        query = { ...query, ...customFilters[key](value) };
                    } else {
                        // Otherwise, use a case-insensitive regular expression for matching
                        query[key] = { $regex: new RegExp(value, 'i') };
                    }
                }
            }

            // Count the total number of documents matching the query
            const total = await Model.countDocuments(query);
            // Find the documents with pagination and sorting
            const results = await Model.find(query)
                .limit(limit)
                .skip(startIndex)
                .sort({ createdAt: -1 });

            // Send the results as a JSON response, along with pagination info
            res.status(200).json({
                results,
                page,
                pages: Math.ceil(total / limit),
                total
            });
        })
    ];
};

export default createQueryHandler;
