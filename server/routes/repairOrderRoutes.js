import express from 'express';
import { protect, requirePermission } from '../middleware/authMiddleware.js';
import { PERMISSIONS } from '../utils/roles.js';
import {
    queryRepairOrders,
    createRepairOrder,
    updateRepairOrder,
    deleteRepairOrder
} from '../controllers/repairOrderController.js';

const router = express.Router();

// Protected routes
router.use(protect);

// Routes requiring specific permissions
router.route('/')
    .get(requirePermission(PERMISSIONS.READ_REPAIR_ORDERS), queryRepairOrders)
    .post(requirePermission(PERMISSIONS.CREATE_REPAIR_ORDER), createRepairOrder);

router.route('/:id')
    .put(requirePermission(PERMISSIONS.UPDATE_REPAIR_ORDER), updateRepairOrder)
    .delete(requirePermission(PERMISSIONS.DELETE_REPAIR_ORDER), deleteRepairOrder);

export default router;