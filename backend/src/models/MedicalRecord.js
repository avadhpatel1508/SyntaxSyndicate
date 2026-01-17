const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: String,
  description: String,
  recordDate: Date,
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
