// === File: server/routes/parcel.js ===
const express = require('express');
const { bookParcel, getMyParcels, updateParcelStatus } = require('../controllers/parcelController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/book', authMiddleware, bookParcel);
router.get('/my', authMiddleware, getMyParcels);
router.put('/:id/status', authMiddleware, updateParcelStatus);

module.exports = router;