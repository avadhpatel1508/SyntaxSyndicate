const Crop = require("../models/cropSchema");

const addCrop = async (req, res) => {
  const crop = await Crop.create({
    userId: req.user._id,
    ...req.body,
  });

  res.status(201).json(crop);
};

const getMyCrops = async (req, res) => {
  const crops = await Crop.find({ userId: req.user._id });
  res.json(crops);
};

module.exports = { addCrop, getMyCrops };
