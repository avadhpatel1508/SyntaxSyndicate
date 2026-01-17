const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctorName: String,
  medicines: [String],
  prescribedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
