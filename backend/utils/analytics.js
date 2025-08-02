// === File: backend/utils/analytics.js ===
const Parcel = require('../models/Parcel');
const mongoose = require('mongoose');

exports.getDashboardStats = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dailyBookings = await Parcel.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } });
  const failedDeliveries = await Parcel.countDocuments({ status: 'FAILED' });
  const codAmount = await Parcel.aggregate([
    { $match: { paymentType: 'COD', status: { $ne: 'CANCELLED' } } },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);

  return {
    dailyBookings,
    failedDeliveries,
    codAmount: codAmount[0]?.total || 0,
  };
};
