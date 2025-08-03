// backend/controllers/agentController.js
import Parcel from '../models/Parcel.js';

export const getAssignedParcels = async (req, res) => {
  const parcels = await Parcel.find({ assignedTo: req.user._id })
    .populate('bookedBy', 'name phone')
    .sort({ createdAt: -1 });

  res.json(parcels);
};

export const updateParcelStatus = async (req, res) => {
  const { parcelId, status, location } = req.body;

  const validStatuses = ['Picked Up', 'In Transit', 'Delivered', 'Failed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const parcel = await Parcel.findById(parcelId);
  if (!parcel) {
    return res.status(404).json({ message: 'Parcel not found' });
  }

  if (parcel.assignedTo.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to update this parcel' });
  }

  const currentStatus = parcel.status || 'Not assigned yet';

  // Validate status transition
  if (status === 'In Transit' && currentStatus !== 'Picked Up') {
    return res.status(400).json({ message: 'Must update status to Picked Up first' });
  }

  if (status === 'Delivered' && currentStatus !== 'In Transit') {
    return res.status(400).json({ message: 'Must update status to In Transit first' });
  }

  // Failed can be set at any time
  parcel.status = status;
  if (location) {
    parcel.location = location;
  }
  await parcel.save();

  res.json({ message: 'Status updated successfully' });
};