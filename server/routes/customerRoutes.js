import express from 'express';
import { protect, requirePermission } from '../middleware/authMiddleware.js';
import { PERMISSIONS } from '../utils/roles.js';
import {
    queryCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from '../controllers/customerController.js';

const router = express.Router();

// Protected routes
router.use(protect);

// Routes requiring specific permissions
router.route('/')
    .get(requirePermission(PERMISSIONS.READ_CUSTOMERS), queryCustomers)
    .post(requirePermission(PERMISSIONS.CREATE_CUSTOMER), createCustomer);

router.route('/:id')
    .put(requirePermission(PERMISSIONS.UPDATE_CUSTOMER), updateCustomer)
    .delete(requirePermission(PERMISSIONS.DELETE_CUSTOMER), deleteCustomer);

export default router;