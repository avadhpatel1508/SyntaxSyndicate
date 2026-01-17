const redisClient = require("../config/redis");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");

/**
 * REGISTER (Firebase based)
 */


const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      emailId,
      password,
      mobileNo,
      address, // expected as object
    } = req.body;

    /*
      address = {
        line1,
        city,
        state,
        pincode
      }
    */

    // 1️⃣ Basic validation
    if (!firstName || !emailId || !password) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    // Optional but recommended pincode validation
    if (address?.pincode && address.pincode.length !== 6) {
      return res.status(400).json({
        message: "Pincode must be exactly 6 digits",
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user according to schema
    const user = await User.create({
      firstName,
      lastName,
      emailId,
      mobileNo,
      password: hashedPassword,
      role: "citizen",

      address: {
        line1: address?.line1 || "",
        city: address?.city || "",
        state: address?.state || "",
        pincode: address?.pincode || "",
      },

      verification: {
        emailVerified: true, // later: email OTP
        phoneVerified: false,
      },

      servicesUsed: [],
      isActive: true,
    });

    // 5️⃣ Issue JWT
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
      // secure: true, // enable in production
    });

    // 6️⃣ Response (safe fields only)
    res.status(201).json({
      message: "Registration successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        mobileNo: user.mobileNo,
        role: user.role,
        address: user.address,
        verification: user.verification,
      },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


/**
 * LOGIN (Firebase token based – RECOMMENDED)
 */
const login = async (req, res) => {
  try {
    const { firebaseIdToken } = req.body;

    if (!firebaseIdToken) {
      return res.status(400).json({ message: "Firebase token required" });
    }

    // ✅ Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(firebaseIdToken);

    const emailId = decodedToken.email?.toLowerCase();

    if (!emailId) {
      return res.status(400).json({ message: "Email not found in token" });
    }

    // ✅ Find user in DB
    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }

    // ✅ Account status check
    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated" });
    }

    // (Optional but recommended)
    if (!user.verification.emailVerified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    // ✅ Create JWT
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    // ✅ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
      // secure: true, // enable in production (HTTPS)
    });

    // ✅ Response aligned with schema
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        mobileNo: user.mobileNo,
        role: user.role,
        servicesUsed: user.servicesUsed,
        address: user.address,
        verification: user.verification,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(401).json({ message: "Invalid Firebase token" });
  }
};

/**
 * LOGOUT
 */
const logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(200).json({ message: "Already logged out" });

    const payload = jwt.verify(token, process.env.JWT_KEY);

    // blacklist token till expiry
    const ttl = payload.exp - Math.floor(Date.now() / 1000);
    await redisClient.setEx(`bl:${token}`, ttl, "blocked");

    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("LOGOUT ERROR:", err);
    res.status(500).json({ message: "Logout failed" });
  }
};

/**
 * DELETE PROFILE
 */
const deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  logout,
  deleteProfile,
};
