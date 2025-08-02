// === File: backend/routes/bookingRoutes.js ===

import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { createBooking, getMyBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('customer'), createBooking);
router.get('/my-bookings', protect, authorizeRoles('customer'), getMyBookings);

export default router;

