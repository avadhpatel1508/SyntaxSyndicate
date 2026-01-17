const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    parentName: {
      type: String,
      required: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    schoolName: {
      type: String,
      required: true,
    },

    classLevel: {
      type: String,
      required: true,
    },

    admissionNumber: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    medicalHistory: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Education", educationSchema);
