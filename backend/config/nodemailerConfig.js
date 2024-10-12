require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('Email User:', process.env.USER_EMAIL); 
console.log('Email Pass:', process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.USER_EMAIL, 
    pass: process.env.EMAIL_PASS,
  },
});


module.exports = transporter;
