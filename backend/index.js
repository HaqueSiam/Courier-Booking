import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import agentRoutes from './routes/agentRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();


// Basic middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
  ],
 methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('🚀 Courier Booking API is running');
});


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/users', userRoutes);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});




mongoose.connect(process.env.MONGO_URI).then(() => console.log('✅ MongoDB Connected from index.js'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

export default app;

