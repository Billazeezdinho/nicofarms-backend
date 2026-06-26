const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables");
  }

  return process.env.JWT_SECRET;
};

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ success: false, message: "Authorization token required" });
    }

    const decoded = jwt.verify(token, getJwtSecret());
    const user = await User.findById(decoded.id).select("-otp -otpExpiresAt");

    if (!user || !user.isVerified) {
      return res.status(401).json({ success: false, message: "Invalid or unverified user" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = auth;
