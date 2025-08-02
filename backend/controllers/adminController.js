// === File: backend/controllers/adminController.js ===
import Parcel from '../models/Parcel.js';
import User from '../models/User.js';

export const getDashboardBookings = async (req, res) => {
  const { status } = req.query;

  let filter = { assignedTo: { $ne: null } };
  if (status && status !== 'All') {
    filter.status = status;
  }

  const parcels = await Parcel.find(filter)
    .populate('bookedBy', 'name email phone')
    .populate('assignedTo', 'name phone')
    .sort({ createdAt: -1 });

  res.json(parcels);
};

export const getUnassignedParcelsAndAgents = async (req, res) => {
  const unassignedParcels = await Parcel.find({ assignedTo: null }).sort({ createdAt: -1 });

  const busyAgentIds = await Parcel.find({
    assignedTo: { $ne: null },
    status: { $nin: ['Delivered', 'Failed'] },
  }).distinct('assignedTo');

  const availableAgents = await User.find({
    role: 'agent',
    _id: { $nin: busyAgentIds },
  }).select('_id name phone');

  res.json({ unassignedParcels, availableAgents });
};

export const assignParcelToAgent = async (req, res) => {
  const { parcelId, agentId } = req.body;

  if (!parcelId || !agentId) {
    return res.status(400).json({ message: 'Parcel ID and Agent ID required' });
  }

  const busyAgentParcels = await Parcel.find({
    assignedTo: agentId,
    status: { $nin: ['Delivered', 'Failed'] },
  });

  if (busyAgentParcels.length > 0) {
    return res.status(400).json({ message: 'Agent is currently assigned to another parcel' });
  }

  const parcel = await Parcel.findById(parcelId);
  if (!parcel) {
    return res.status(404).json({ message: 'Parcel not found' });
  }

  if (parcel.assignedTo) {
    return res.status(400).json({ message: 'Parcel is already assigned' });
  }

  parcel.assignedTo = agentId;
  parcel.status = 'Picked Up';
  await parcel.save();

  res.json({ message: 'Parcel assigned successfully' });
};

export const getUsersWithBookingHistory = async (req, res) => {
  const users = await User.find().select('_id name email phone role').lean();

  for (const user of users) {
    const bookings = await Parcel.find({ bookedBy: user._id }).select('parcelName status');
    user.bookings = bookings.length > 0 ? bookings : 'No booking history found';
  }

  res.json(users);
};

