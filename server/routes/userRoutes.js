import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

router.get('/', asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
    }
));


export default router;