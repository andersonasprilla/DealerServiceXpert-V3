import express from 'express';
const router = express.Router();
import {
    loginUser,
    logoutUser,
    registerUser,
    queryUsers,
    updateUser,
    deleteUser,
    getCurrentUser
} from '../controllers/userController.js';

router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/').post(registerUser).get(queryUsers);
router.route('/me').get(getCurrentUser);
router.route('/:id').put(updateUser).delete(deleteUser);

export default router; 
