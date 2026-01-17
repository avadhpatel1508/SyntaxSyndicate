const AgricultureProfile = require("../models/agricultureProfileSchema");

const createAgricultureProfile = async (req, res) => {
  try {
    const profile = await AgricultureProfile.create({
      userId: req.user._id,
      ...req.body,
    });

    res.status(201).json(profile);
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ message: "Profile already exists" });

    res.status(500).json({ message: "Failed to create profile" });
  }
};

const getAgricultureProfile = async (req, res) => {
  const profile = await AgricultureProfile.findOne({
    userId: req.user._id,
  });

  res.json(profile);
};

module.exports = { createAgricultureProfile, getAgricultureProfile };
