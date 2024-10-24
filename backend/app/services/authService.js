const User = require('../models/user');
const crypto = require('crypto');
const transporter = require('../../config/nodemailerConfig')
const jwt = require('jsonwebtoken');



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
    
    console.log(user);
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid email or password');
    }


   
    return { user, token };
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
  async sendVerificationCode(user) {
    const otpCode = crypto.randomInt(100000, 999999).toString();

    user.otpCode = otpCode;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      to: user.email,
      subject: 'Votre code de vérification',
      html: `<p>Votre code de vérification est : <strong>${otpCode}</strong></p>`,
    });

    return otpCode;
  }

  async  verifyOTP(email, otpCode) {
    const user = await User.findOne({ email });

    if (!user) throw new Error('Utilisateur non trouvé');
    if (user.otpExpires < Date.now()) throw new Error('Code OTP expiré');
    if (user.otpCode !== otpCode) throw new Error('Code OTP invalide');

    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpires = undefined;
    await user.save();

    return user;
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

    const resetUrl = `http://localhost:5173/reset_password/${token}`;
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
 

  async updateUserProfile(userId, data) {
    const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });
    if (!updatedUser) throw new Error('User not found');
    return updatedUser;
  }

  
  async getUserProfile(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    return user;
  }
}

module.exports = new AuthService();