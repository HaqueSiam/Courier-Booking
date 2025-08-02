// === File: backend/models/User.js ===
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['admin', 'agent', 'customer'], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('User', userSchema);

