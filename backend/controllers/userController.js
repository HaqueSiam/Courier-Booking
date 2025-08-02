// backend/controllers/userController.js

import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ADMIN_SECRET, AGENT_SECRET } from '../utils/constants.js';

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role, secret } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if ((role === 'admin' && secret !== ADMIN_SECRET) || (role === 'agent' && secret !== AGENT_SECRET)) {
      return res.status(403).json({ message: 'Invalid secret key for role' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Fetching users failed', error: err.message });
  }
};
