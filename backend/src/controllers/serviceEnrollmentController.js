const ServiceEnrollment = require("../models/serviceEnrollmentSchema");
const User = require("../models/user");

/**
 * Enroll user into a service
 * POST /service/enroll
 */
const enrollService = async (req, res) => {
  try {
    const userId = req.user._id;
    const { service } = req.body;

    if (!service) {
      return res.status(400).json({ message: "Service name required" });
    }

    const enrollment = await ServiceEnrollment.create({
      userId,
      service,
    });

    // Optional: track services on user document
    await User.findByIdAndUpdate(userId, {
      $addToSet: { servicesUsed: service },
    });

    res.status(201).json({
      message: `${service} service activated`,
      enrollment,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Service already activated" });
    }

    console.error("ENROLL SERVICE ERROR:", err);
    res.status(500).json({ message: "Failed to activate service" });
  }
};

/**
 * Get all active services for logged-in user
 * GET /service/my-services
 */
const getMyServices = async (req, res) => {
  try {
    const services = await ServiceEnrollment.find({
      userId: req.user._id,
      isActive: true,
    }).select("service createdAt");

    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

/**
 * Disable a service (soft remove)
 * PATCH /service/deactivate
 */
const deactivateService = async (req, res) => {
  try {
    const { service } = req.body;

    await ServiceEnrollment.findOneAndUpdate(
      { userId: req.user._id, service },
      { isActive: false }
    );

    res.json({ message: `${service} service deactivated` });
  } catch (err) {
    res.status(500).json({ message: "Failed to deactivate service" });
  }
};

module.exports = {
  enrollService,
  getMyServices,
  deactivateService,
};
