//backend/controllers/bookingController.js
import Parcel from '../models/Parcel.js';

export const createBooking = async (req, res) => {
  const {
    parcelName,
    pickupAddress,
    deliveryAddress,
    parcelType,
    parcelSize,
    paymentType,
  } = req.body;

  const exists = await Parcel.findOne({ parcelName });
  if (exists) {
    return res.status(400).json({ message: 'Parcel name must be unique' });
  }

  const parcel = await Parcel.create({
    parcelName,
    pickupAddress,
    deliveryAddress,
    parcelType,
    parcelSize,
    paymentType,
    bookedBy: req.user._id,
  });

  res.status(201).json(parcel);
};

export const getMyBookings = async (req, res) => {
  const parcels = await Parcel.find({ bookedBy: req.user._id })
    .populate('assignedTo', 'name phone')
    .sort({ createdAt: -1 });

  res.json(parcels);
};
