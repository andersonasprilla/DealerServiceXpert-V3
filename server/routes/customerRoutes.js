import express from 'express';
const router = express.Router();
import {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer
} from '../controllers/customerController.js';

router.route('/').get(getCustomers).post(createCustomer);
router.route('/:id').get(getCustomerById).put(updateCustomer);

export default router;
