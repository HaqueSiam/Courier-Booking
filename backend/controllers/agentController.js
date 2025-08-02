// === File: backend/controllers/agentController.js ===
import Parcel from '../models/Parcel.js';

export const getAssignedParcels = async (req, res) => {
  const parcels = await Parcel.find({ assignedTo: req.user._id })
    .populate('bookedBy', 'name phone')
    .sort({ createdAt: -1 });

  res.json(parcels);
};

export const updateParcelStatus = async (req, res) => {
  const { parcelName, status } = req.body;

  const validStatuses = ['Picked Up', 'In Transit', 'Delivered', 'Failed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const parcel = await Parcel.findOne({ parcelName, assignedTo: req.user._id });
  if (!parcel) {
    return res.status(404).json({ message: 'Parcel not found or not assigned to you' });
  }

  const currentStatus = parcel.status;

  if (status === 'Picked Up') {
    if (currentStatus !== 'Not assigned yet' && currentStatus !== 'Failed') {
      return res.status(400).json({ message: 'Cannot update status to Picked Up now' });
    }
  } else if (status === 'In Transit') {
    if (currentStatus !== 'Picked Up') {
      return res.status(400).json({ message: 'Must update status to Picked Up before In Transit' });
    }
  } else if (status === 'Delivered') {
    if (currentStatus !== 'In Transit') {
      return res.status(400).json({ message: 'Must update status to In Transit before Delivered' });
    }
  }

  parcel.status = status;
  await parcel.save();

  res.json({ message: 'Status updated successfully' });
};

