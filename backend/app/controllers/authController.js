const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    console.log(user);
    
  await authService.sendVerificationEmail(user);
    res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await authService.login(req.body.email, req.body.password);
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const user = await authService.verifyEmail(req.params.token);
    res.status(200).json({ message: 'Email verified successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    await authService.forgetPassword(req.body.email);
    console.log(req.body.email)
    res.status(200).json({ message: 'Reset password email sent.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await authService.resetPassword(req.params.token, req.body.password);
    res.status(200).json({ message: 'Password reset successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  forgetPassword,
  resetPassword,
};
