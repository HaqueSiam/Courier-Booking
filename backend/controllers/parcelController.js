// === File: backend/controllers/parcelController.js ===
import Parcel from '../models/Parcel.js';
import User from '../models/User.js';

// Customer creates a parcel
export const createParcel = async (req, res) => {
  try {
    const parcel = new Parcel({
      ...req.body,
      customer: req.user._id,
    });

    await parcel.save();
    res.status(201).json(parcel);
  } catch (err) {
    res.status(400).json({ message: 'Failed to book parcel', error: err.message });
  }
};

// Admin assigns a parcel to agent
export const assignParcel = async (req, res) => {
  try {
    const { parcelId, agentId } = req.body;

    const agent = await User.findById(agentId);
    if (!agent || agent.role !== 'agent') {
      return res.status(404).json({ message: 'Agent not found' });
    }

    const updated = await Parcel.findByIdAndUpdate(
      parcelId,
      { agent: agentId, status: 'ASSIGNED' },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Parcel not found' });

    res.json({ message: 'Parcel assigned successfully', parcel: updated });
  } catch (err) {
    res.status(500).json({ message: 'Assignment failed', error: err.message });
  }
};

// Agent updates parcel status
export const updateParcelStatus = async (req, res) => {
  try {
    const { parcelId } = req.params;
    const { status } = req.body;

    const parcel = await Parcel.findById(parcelId);

    if (!parcel) return res.status(404).json({ message: 'Parcel not found' });
    if (parcel.agent?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not assigned to this parcel' });
    }

    parcel.status = status;
    await parcel.save();

    res.json({ message: 'Status updated successfully', parcel });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status', error: err.message });
  }
};

// Role-based list view
export const getParcels = async (req, res) => {
  try {
    let parcels;

    if (req.user.role === 'admin') {
      parcels = await Parcel.find().populate('customer', 'username').populate('agent', 'username');
    } else if (req.user.role === 'customer') {
      parcels = await Parcel.find({ customer: req.user._id });
    } else if (req.user.role === 'agent') {
      parcels = await Parcel.find({ agent: req.user._id });
    }

    res.json(parcels);
  } catch (err) {
    res.status(500).json({ message: 'Fetching parcels failed', error: err.message });
  }
};

// Dashboard analytics
export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dailyBookings = await Parcel.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const failedDeliveries = await Parcel.countDocuments({ status: 'FAILED' });

    const codAmount = await Parcel.aggregate([
      {
        $match: {
          paymentType: 'COD',
          status: { $nin: ['CANCELLED'] },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    res.json({
      dailyBookings,
      failedDeliveries,
      codAmount: codAmount[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ message: 'Analytics failed', error: err.message });
  }
};
