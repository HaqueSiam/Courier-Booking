// === File: backend/routes/admin.js ===
const express = require('express');
const { assignAgent, analytics } = require('../controllers/adminController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/assign', authMiddleware, roleMiddleware('Admin'), assignAgent);
router.get('/analytics', authMiddleware, roleMiddleware('Admin'), analytics);

module.exports = router;