import asyncHandler from "../middleware/asyncHandler.js";
import { protect } from '../middleware/authMiddleware.js';

const createQueryHandler = (Model, allowedFields, customFilters = {}) => {
    return [
        protect,
        asyncHandler(async (req, res) => {
            const page = parseInt(req.query.page, 10) || 1;
            const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50);
            const startIndex = (page - 1) * limit;

            let orConditions = [];

            // Build query based on provided parameters
            for (const [key, value] of Object.entries(req.query)) {
                if (allowedFields.includes(key) && value.trim()) {
                    if (customFilters[key]) {
                        orConditions.push(customFilters[key](value));
                    } else {
                        orConditions.push({ [key]: { $regex: new RegExp(value, 'i') } });
                    }
                }
            }

            // Return empty results if no valid query parameters are provided
            if (orConditions.length === 0) {
                return res.status(200).json({
                    results: [],
                    page,
                    pages: 0,
                    total: 0
                });
            }

            let query = { $or: orConditions };

            const total = await Model.countDocuments(query);
            const results = await Model.find(query)
                .limit(limit)
                .skip(startIndex)
                .sort({ createdAt: -1 });

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