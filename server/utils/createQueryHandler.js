import asyncHandler from "../middleware/asyncHandler.js";
import { protect } from '../middleware/authMiddleware.js';
import { getPaginationParams, getPaginationMetadata } from '../utils/paginationUtils.js';
import mongoose from 'mongoose';

const createQueryHandler = (Model, allowedFields) => {
    return [
        protect,
        asyncHandler(async (req, res) => {
            const hasQueryParams = Object.keys(req.query).some(key => 
                allowedFields.includes(key) && req.query[key].trim()
            );

            if (!hasQueryParams) {
                return res.status(200).json({
                    results: [],
                    totalPages: 0,
                    currentPage: 1,
                    totalResults: 0,
                });
            }

            const { page, limit, skip } = getPaginationParams(req.query);

            let query = {};

            for (const [key, value] of Object.entries(req.query)) {
                if (allowedFields.includes(key) && value.trim()) {
                    if (key === 'user') {
                        query[key] = new mongoose.Types.ObjectId(value);
                    } else {
                        query[key] = value;  // Exact match
                    }
                }
            }

            const total = await Model.countDocuments(query);
            const results = await Model.find(query)
                .populate({
                    path: 'customer',
                    select: 'firstName lastName phone -_id', 
                    model: 'Customer'
                })
                .limit(limit)
                .skip(skip)
                .sort({ createdAt: -1 });

            const paginationMetadata = getPaginationMetadata(page, limit, total);

            res.status(200).json({
                results,
                ...paginationMetadata
            });
        })
    ];
};

export default createQueryHandler;