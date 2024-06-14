import express from 'express';
const router = express.Router();
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} from '../controllers/userController.js';
import { protect, manager } from '../middleware/authMiddleware.js';

router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/').post( protect, manager, registerUser).get(protect, manager, getUsers);
router.route('/:id').get(protect, manager, getUserById).put(protect, manager, updateUser).delete(protect, manager, deleteUser);

export default router;