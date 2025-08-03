// backend/models/Parcel.js
import mongoose from 'mongoose';

const parcelSchema = new mongoose.Schema({
  parcelName: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  pickupAddress: { 
    type: String, 
    required: true,
    trim: true 
  },
  deliveryAddress: { 
    type: String, 
    required: true,
    trim: true 
  },
  parcelType: { 
    type: String, 
    enum: ['Fragile', 'Solid', 'Liquid'], 
    required: true 
  },
  parcelSize: { 
    type: String, 
    enum: ['Small', 'Medium', 'Large'], 
    required: true 
  },
  paymentType: { 
    type: String, 
    enum: ['Cash on Delivery', 'Prepaid'], 
    required: true 
  },
  bookedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  status: {
    type: String,
    enum: ['Not assigned yet', 'Picked Up', 'In Transit', 'Delivered', 'Failed'],
    default: 'Not assigned yet'
  },
  location: {
    type: String,
    trim: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
parcelSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add text indexes for search functionality
parcelSchema.index({ parcelName: 'text', pickupAddress: 'text', deliveryAddress: 'text' });

const Parcel = mongoose.model('Parcel', parcelSchema);

export default Parcel;