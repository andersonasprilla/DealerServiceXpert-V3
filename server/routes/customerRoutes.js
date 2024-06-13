import express from 'express';
const router = express.Router();
import { getCustomers, getCustomerById } from '../controllers/customerController.js';

router.route('/').get(getCustomers);
router.route('/:id').get(getCustomerById);

export default router;