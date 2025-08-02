// backend/utils/analytics.js
import Booking from '../models/Booking.js';

export const getDashboardStats = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Count bookings created today
  const dailyBookings = await Booking.countDocuments({
    createdAt: { $gte: today, $lt: tomorrow }
  });

  // Count failed deliveries
  const failedDeliveries = await Booking.countDocuments({
    status: 'FAILED'
  });

  // Sum of COD amounts where paymentType is COD and status is not CANCELLED
  const codAmountAggregation = await Booking.aggregate([
    { $match: { paymentType: 'COD', status: { $ne: 'CANCELLED' } } },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);

  return {
    dailyBookings,
    failedDeliveries,
    codAmount: codAmountAggregation[0]?.total || 0,
  };
};
