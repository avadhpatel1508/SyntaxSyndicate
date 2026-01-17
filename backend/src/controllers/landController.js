const Land = require("../models/landSchema");

const addLand = async (req, res) => {
  const land = await Land.create({
    userId: req.user._id,
    ...req.body,
  });

  res.status(201).json(land);
};

const getMyLands = async (req, res) => {
  const lands = await Land.find({ userId: req.user._id });
  res.json(lands);
};

module.exports = { addLand, getMyLands };
