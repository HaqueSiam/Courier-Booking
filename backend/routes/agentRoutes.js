// === File: backend/routes/agentRoutes.js ===
import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { getAssignedParcels, updateParcelStatus } from '../controllers/agentController.js';

const router = express.Router();

router.use(protect);
router.use(authorizeRoles('agent'));

router.get('/assigned-parcels', getAssignedParcels);
router.post('/update-status', updateParcelStatus);

export default router;
