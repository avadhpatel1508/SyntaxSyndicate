const jwt = require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis")


const roleAccess = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions",
      });
    }
    next();
  };
};

module.exports = roleAccess;
