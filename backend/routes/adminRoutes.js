// backend/routes/adminRoutes.js
import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import {
  getDashboardBookings,
  getUnassignedParcelsAndAgents,
  assignParcelToAgent,
  getUsersWithBookingHistory,
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/dashboard', getDashboardBookings);
router.get('/assign-parcel-data', getUnassignedParcelsAndAgents);
router.post('/assign-parcel', assignParcelToAgent);
router.get('/users', getUsersWithBookingHistory);

export default router;