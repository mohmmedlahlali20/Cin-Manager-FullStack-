const User = require('../models/user');
const crypto = require('crypto');
const transporter = require('../../config/nodemailerConfig')
require('dotenv').config();



class AuthService {
  async register(data) {
    const user = new User(data);
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error('Email already in use');
    }


    await user.save();
    return user;
  }


  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email or password');
    }
    return user;
  }

  async sendVerificationEmail(user) {
    const token = crypto.randomBytes(32).toString('hex');
    user.verificationToken = token;
    await user.save();

    const verificationUrl = `http://localhost:3000/api/auth/verify-email/${token}`;
    
    await transporter.sendMail({
      to: user.email,
      subject: 'Verify your email',
      html: `Click <a href="${verificationUrl}">here</a> to verify your email.`,
    });
  }

  async verifyEmail(token) {
    const user = await User.findOne({ verificationToken: token });
    if (!user) throw new Error('Invalid token');
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    return user;
  }
  async forgetPassword(email) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const token = crypto.randomBytes(32).toString('hex');
    user.verificationToken = token;
    await user.save();

    const resetUrl = `http://localhost:3000/api/auth/reset-password/${token}`;
    await transporter.sendMail({
      to: user.email,
      subject: 'Reset your password',
      html: `Click <a href="${resetUrl}">here</a> to reset your password.`,
    });
  }

  async resetPassword(token, newPassword) {
    console.log(token);
    console.log(newPassword);
    
    
    const user = await User.findOne({ verificationToken: token });
    if (!user) throw new Error('Invalid token');
    user.password = newPassword; 
    user.verificationToken = undefined;
    await user.save();
    return user;
  }
}

module.exports = new AuthService();
