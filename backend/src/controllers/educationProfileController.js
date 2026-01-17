const EducationProfile = require("../models/educationProfileSchema");

const createEducationProfile = async (req, res) => {
  const profile = await EducationProfile.create({
    userId: req.user._id,
    ...req.body,
  });

  res.status(201).json(profile);
};

const getEducationProfile = async (req, res) => {
  const profile = await EducationProfile.findOne({ userId: req.user._id });
  res.json(profile);
};

module.exports = { createEducationProfile, getEducationProfile };
