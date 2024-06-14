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

router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/').post(registerUser).get(getUsers);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

export default router;