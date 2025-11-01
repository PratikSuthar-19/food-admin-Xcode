import User from '../models/User.js';

export const createUser = async (payload) => {
  const exists = await User.findOne({ email: payload.email });
  if (exists) {
    const err = new Error('Email already in use');
    err.statusCode = 400;
    throw err;
  }
  const user = await User.create(payload);
  user.password = undefined;
  return user;
};

export const getAllUsers = () => User.find().select('-password').sort({ createdAt: -1 });

export const getUserById = (id) => User.findById(id).select('-password');

export const updateUser = async (id, payload) => {
  if (payload.email) {
    const other = await User.findOne({ email: payload.email, _id: { $ne: id } });
    if (other) {
      const err = new Error('Email already used by another user');
      err.statusCode = 400;
      throw err;
    }
  }
  if (payload.password) {
    const user = await User.findById(id);
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    Object.assign(user, payload); // will trigger pre-save to hash password
    await user.save();
    user.password = undefined;
    return user;
  } else {
    const updated = await User.findByIdAndUpdate(id, payload, { new: true }).select('-password');
    if (!updated) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    return updated;
  }
};

export const deleteUser = async (id) => {
  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }
  return deleted;
};
