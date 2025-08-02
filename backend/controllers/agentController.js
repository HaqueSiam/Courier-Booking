// === File: backend/controllers/agentController.js ===
const Parcel = require('../models/Parcel');

exports.getAssignedParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find({ assignedTo: req.user.id });
    res.json(parcels);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assigned parcels' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { parcelId } = req.params;
    const { status, location } = req.body;

    const parcel = await Parcel.findOne({ _id: parcelId, assignedTo: req.user.id });
    if (!parcel) return res.status(404).json({ error: 'Parcel not found or not assigned' });

    parcel.status = status;
    parcel.location = location;
    parcel.history.push({ status, location, timestamp: new Date() });
    parcel.updatedAt = new Date();

    await parcel.save();
    res.json({ message: 'Status updated successfully', parcel });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update parcel status' });
  }
};
