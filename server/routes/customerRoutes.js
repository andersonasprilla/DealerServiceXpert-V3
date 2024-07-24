import express from 'express';
const router = express.Router();
import {
    queryCustomers,
} from '../controllers/customerController.js';

router.route('/').get(queryCustomers);

export default router; 
