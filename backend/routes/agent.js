// === File: backend/routes/agent.js ===
const express = require('express');
const Parcel = require('../models/Parcel');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/my', authMiddleware, roleMiddleware('Agent'), async (req, res) => {
  const parcels = await Parcel.find({ agent: req.user.id });
  res.json(parcels);
});

module.exports = router;
