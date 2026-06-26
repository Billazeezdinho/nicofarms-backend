const userModel = require('../models/userModel');
const sendMail = require('../utils/sendEmail');
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');

const generateOTP = () => {
  return otpGenerator.generate(6, { 
    upperCaseAlphabets: false, 
    lowerCaseAlphabets: false, 
    specialChars: false 
  });
};

exports.createUser = async (req, res) => {
  try {
    const { name, office, email } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const emailOtp = generateOTP();
    const otpExpires = Date.now() + 5 * 60 * 1000;
    const newUser = new userModel({ name, office, email, emailOtp, otpExpires });
    await newUser.save();

    await sendMail({
      email,
      subject: "TSAN Welcome Email",
      text: `Your OTP is ${emailOtp}`,
      html: `<p>Your OTP is <strong>${emailOtp}</strong></p>`,
    });
    res.status(201).json({ message: "User created and OTP sent to email" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await userModel.findOne({ email, role: "admin" });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    };

    const emailOtp = generateOTP();
    const otpExpires = Date.now() + 5 * 60 * 1000; 
    
    await sendMail({
      email,
      subject: "TSAN Welcome Email",
      text: `Your OTP is ${emailOtp}`,
      html: `<p>Your OTP is <strong>${emailOtp}</strong></p>`,
    });


    admin.emailOtp = emailOtp;
    admin.otpExpires = otpExpires;
    await admin.save();

    res.status(200).json({ message: "OTP sent to email" });
  }catch{
    res.status(500).json({ message: "Server error" });
  }
};
