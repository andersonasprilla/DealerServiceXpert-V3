import express from 'express';
const router = express.Router();
import {
    queryRepairOrders,
    
} from '../controllers/repairOrderController.js';

router.route('/').get(queryRepairOrders);

export default router;