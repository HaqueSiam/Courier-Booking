// backend/controllers/userController.js
import User from '../models/User.js';
import Parcel from '../models/Parcel.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
  try {
    // Get all users with their parcel information
    const users = await User.find().select('-password').lean();
    
    // Add parcel information to each user
    for (const user of users) {
      const parcels = await Parcel.find({ bookedBy: user._id })
        .select('parcelName status createdAt')
        .sort({ createdAt: -1 });
      
      user.parcels = parcels.length > 0 ? parcels : [];
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    
    // Check if email is being updated and if it's already taken
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.params.id) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Check if user has any parcels
    const parcels = await Parcel.find({ bookedBy: req.params.id });
    if (parcels.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete user with active parcels',
        parcelsCount: parcels.length
      });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};