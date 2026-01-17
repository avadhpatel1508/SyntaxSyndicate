const jwt = require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis");

const userMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Token is not present" });
    }

    // ✅ Verify JWT
    const payload = jwt.verify(token, process.env.JWT_KEY);

    const { _id } = payload;

    if (!_id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // ✅ Fetch user
    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    // ✅ Check Redis blocklist (logout / revoked token)
    const isBlocked = await redisClient.exists(`token:${token}`);

    if (isBlocked) {
      return res.status(401).json({ message: "Token revoked" });
    }

    // 🔥 FIX: Attach user properly
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = userMiddleware;
