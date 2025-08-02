// === File: backend/controllers/adminController.js ===
const Parcel = require('../models/Parcel');
const User = require('../models/User');

exports.assignAgent = async (req, res) => {
  const { parcelId, agentId } = req.body;
  const parcel = await Parcel.findById(parcelId);
  const agent = await User.findById(agentId);
  if (!parcel || !agent || agent.role !== 'Agent') return res.status(400).json({ error: 'Invalid agent or parcel' });
  parcel.agent = agentId;
  await parcel.save();
  res.json({ message: 'Agent assigned' });
};

exports.analytics = async (req, res) => {
  const dailyCount = await Parcel.countDocuments({ createdAt: { $gte: new Date(Date.now() - 86400000) } });
  const failed = await Parcel.countDocuments({ status: 'Failed' });
  const codAmount = await Parcel.countDocuments({ paymentMode: 'COD' });
  res.json({ dailyCount, failed, codAmount });
};