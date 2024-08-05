import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
import {
    queryVinDecode,
} from '../controllers/vinController.js';

router.route('/vindecode').get(protect, queryVinDecode);

export default router;