import express from 'express';
const router = express.Router();
import {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer
} from '../controllers/customerController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getCustomers).post(protect, createCustomer);
router.route('/:id').get(protect, getCustomerById).put(protect, updateCustomer);

export default router;