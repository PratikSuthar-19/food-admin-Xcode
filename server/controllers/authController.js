import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, mobile, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      const err = new Error('Email already registered');
      err.statusCode = 400;
      throw err;
    }
    const user = await User.create({ name, email, mobile, password, role });
    const token = generateToken(user);
    user.password = undefined;
    res.status(201).json({ success: true, data: { user, token } });
  } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 401;
      throw err;
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const err = new Error('Invalid credentials');
      err.statusCode = 401;
      throw err;
    }
    const token = generateToken(user);
    user.password = undefined;
    res.json({ success: true, data: { user, token } });
  } catch (err) { next(err); }
};

export const me = async (req, res, next) => {
  try {
    res.json({ success: true, data: req.user });
  } catch (err) { next(err); }
};
