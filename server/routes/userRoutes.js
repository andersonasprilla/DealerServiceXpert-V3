import express from 'express';
import { protect, authorize, requirePermission } from '../middleware/authMiddleware.js';
import { ROLES, PERMISSIONS } from '../utils/roles.js';
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
router.post('/login', loginUser);

// Protected routes
router.use(protect);

router.post('/logout', logoutUser);
router.get('/me', getCurrentUser);

// Routes requiring specific permissions
router.get('/', requirePermission(PERMISSIONS.READ_USERS), queryUsers);
router.post('/', requirePermission(PERMISSIONS.CREATE_USER), registerUser);
router.put('/:id', requirePermission(PERMISSIONS.UPDATE_USER), updateUser);
router.delete('/:id', requirePermission(PERMISSIONS.DELETE_USER), deleteUser);

export default router;