// === File: backend/controllers/parcelController.js ===
const Parcel = require('../models/Parcel');

exports.bookParcel = async (req, res) => {
  try {
    const parcel = new Parcel({ ...req.body, customer: req.user.id });
    await parcel.save();
    res.status(201).json({ message: 'Parcel booked', parcel });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMyParcels = async (req, res) => {
  const parcels = await Parcel.find({ customer: req.user.id });
  res.json(parcels);
};

exports.updateParcelStatus = async (req, res) => {
  const { id } = req.params;
  const { status, lat, lon } = req.body;
  const parcel = await Parcel.findById(id);
  if (!parcel) return res.status(404).json({ error: 'Parcel not found' });

  parcel.status = status;
  parcel.coords.push({ lat, lon, timestamp: new Date() });
  await parcel.save();
  res.json({ message: 'Status updated' });
};