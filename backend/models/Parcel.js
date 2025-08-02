// === File: server/models/Parcel.js ===
const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  pickup: String,
  delivery: String,
  size: String,
  paymentMode: String,
  status: { type: String, enum: ['Booked', 'Picked Up', 'In Transit', 'Delivered', 'Failed'], default: 'Booked' },
  coords: [{ lat: Number, lon: Number, timestamp: Date }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Parcel', parcelSchema);