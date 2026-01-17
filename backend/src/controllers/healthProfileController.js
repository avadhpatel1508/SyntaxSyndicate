const HealthProfile = require("../models/healthProfileSchema");

const createHealthProfile = async (req, res) => {
  const profile = await HealthProfile.create({
    userId: req.user._id,
    ...req.body,
  });

  res.status(201).json(profile);
};

const getHealthProfile = async (req, res) => {
  const profile = await HealthProfile.findOne({ userId: req.user._id });
  res.json(profile);
};

module.exports = { createHealthProfile, getHealthProfile };
