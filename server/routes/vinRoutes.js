import express from 'express';
import { protect, requirePermission } from '../middleware/authMiddleware.js';
import { PERMISSIONS } from '../utils/roles.js';
import { queryVinDecode } from '../controllers/vinController.js';

const router = express.Router();

// Protected routes
router.use(protect);

// Routes requiring specific permissions
router.route('/vindecode')
    .get(requirePermission(PERMISSIONS.READ_VIN), queryVinDecode);

export default router;