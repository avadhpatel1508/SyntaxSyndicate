const ServiceEnrollment = require("../models/serviceEnrollmentSchema");

const serviceAccess = (serviceName) => {
  return async (req, res, next) => {
    try {
      const enrollment = await ServiceEnrollment.findOne({
        userId: req.user._id,
        service: serviceName,
        isActive: true,
      });

      if (!enrollment) {
        return res.status(403).json({
          message: `Access denied. ${serviceName} service not active.`,
        });
      }

      next();
    } catch (err) {
      res.status(500).json({ message: "Service access check failed" });
    }
  };
};

module.exports = serviceAccess;
