const Education = require("../models/Education");

/**
 * Create or Update education details
 */
exports.submitEducationDetails = async (req, res) => {
  try {
    const userId = req.user._id;

    // Upsert: one education record per user
    const education = await Education.findOneAndUpdate(
      { user: userId },
      {
        ...req.body,
        user: userId,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Education details saved successfully",
      data: education,
    });
  } catch (error) {
    console.error("Education submit error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save education details",
    });
  }
};

/**
 * Get logged-in user's education details
 */
exports.getEducationDetails = async (req, res) => {
  try {
    const education = await Education.findOne({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      data: education,
    });
  } catch (error) {
    console.error("Get education error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch education details",
    });
  }
};
