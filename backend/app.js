// backend/index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import agentRoutes from './routes/agentRoutes.js';
import userRoutes from './routes/userRoutes.js';
// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://courier-booking-k82x.vercel.app',
    'https://courier-booking-k82x-eans6i9hd.vercel.app'
    
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

export default app;
