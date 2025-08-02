// === File: backend/routes/userRoutes.js ===
import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import {
  getUsersWithBookingHistory,
} from '../controllers/adminController.js'; // or userController.js if you keep that logic there

const router = express.Router();

// Protect route and allow only admin to access
router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/users-bookings', getUsersWithBookingHistory);

export default router;


