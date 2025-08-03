// backend/routes/bookingRoutes.js
import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { createBooking, getMyBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.use(protect);

router.post('/', authorizeRoles('customer'), createBooking);
router.get('/my-bookings', authorizeRoles('customer'), getMyBookings);

export default router;