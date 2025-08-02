// === File: backend/controllers/authController.js ===
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, phone, role, email, password, secretKey } = req.body;

  if (!name || !phone || !role || !email || !password) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  if (role === 'admin' && secretKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ message: 'Invalid admin secret key' });
  }

  if (role === 'agent' && secretKey !== process.env.AGENT_SECRET_KEY) {
    return res.status(401).json({ message: 'Invalid agent secret key' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    phone,
    role,
    email,
    password: hashedPassword,
  });

  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({
    user: {
      id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
    },
    token,
  });
};


