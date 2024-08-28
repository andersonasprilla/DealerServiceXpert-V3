import express from 'express';
import { protect, requirePermission } from '../middleware/authMiddleware.js';
import { PERMISSIONS } from '../utils/roles.js';
import {
    loginUser,
    logoutUser,
    registerUser,
    queryUsers,
    updateUser,
    deleteUser,
    getCurrentUser
} from '../controllers/userController.js';

const router = express.Router();

// Public routes
router.route('/login')
    .post(loginUser);

// Protected routes
router.use(protect);

router.route('/logout')
    .post(logoutUser);

router.route('/me')
    .get(getCurrentUser);

// Routes requiring specific permissions
router.route('/')
    .get(requirePermission(PERMISSIONS.READ_USERS), queryUsers)
    .post(requirePermission(PERMISSIONS.CREATE_USER), registerUser);

router.route('/:id')
    .put(requirePermission(PERMISSIONS.UPDATE_USER), updateUser)
    .delete(requirePermission(PERMISSIONS.DELETE_USER), deleteUser);

export default router;