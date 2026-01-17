const mongoose = require("mongoose");

const vaccinationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vaccineName: String,
  date: Date,
  status: {
    type: String,
    enum: ["Completed", "Pending"],
    default: "Completed",
  },
});

module.exports = mongoose.model("Vaccination", vaccinationSchema);
