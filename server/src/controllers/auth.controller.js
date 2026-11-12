const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000
};

const getUserData = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email
});

async function registerUserController(req, res) {
  const { username, email, password } = req.body;
  if (!username?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedUsername = username.trim().toLowerCase();
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username: normalizedUsername }, { email: normalizedEmail }]
  });
  if (isUserAlreadyExists) {
    return res.status(409).json({ message: 'User with this username or email already exists' });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username: normalizedUsername,
    email: normalizedEmail,
    password: hash
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  res.cookie('token', token, cookieOptions);
  return res.status(201).json({
    message: 'User registered successfully',
    user: getUserData(user)
  });
}

async function loginUserController(req, res) {
  const { email, password } = req.body;
  if (!email?.trim() || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await userModel.findOne({ email: email.trim().toLowerCase() });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  res.cookie('token', token, cookieOptions);
  return res.status(200).json({
    message: 'User logged in successfully',
    user: getUserData(user)
  });
}

async function getCurrentUserController(req, res) {
  const user = await userModel.findById(req.user.id).select('username email');
  if (!user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  return res.status(200).json({ user: getUserData(user) });
}

async function logoutUserController(req, res) {
  const token = req.cookies?.token;

  if (token) {
    await tokenBlacklistModel.create({ token });
  }
  res.clearCookie('token', {
    httpOnly: cookieOptions.httpOnly,
    sameSite: cookieOptions.sameSite,
    secure: cookieOptions.secure
  });
  return res.status(200).json({ message: 'User logged out successfully' });
}

module.exports = {
  registerUserController,
  loginUserController,
  getCurrentUserController,
  logoutUserController
};
