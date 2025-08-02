// === File: backend/models/Parcel.js ===
import mongoose from 'mongoose';

const parcelSchema = new mongoose.Schema({
  parcelName: { type: String, required: true, unique: true },
  pickupAddress: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  parcelType: { type: String, enum: ['fragile', 'solid', 'liquid'], required: true },
  parcelSize: { type: String, enum: ['small', 'medium', 'big'], required: true },
  paymentType: { type: String, enum: ['COD', 'Prepaid'], required: true },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  status: {
    type: String,
    enum: ['Not assigned yet', 'Picked Up', 'In Transit', 'Delivered', 'Failed'],
    default: 'Not assigned yet',
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Parcel', parcelSchema);
