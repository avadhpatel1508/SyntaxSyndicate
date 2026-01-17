const Prescription = require("../models/prescriptionSchema");
const MedicalHistory = require("../models/medicalHistorySchema");
const Vaccination = require("../models/vaccinationSchema");

const getHealthData = async (req, res) => {
  const userId = req.result._id;

  const prescriptions = await Prescription.find({ userId });
  const medicalHistory = await MedicalHistory.find({ userId });
  const vaccinations = await Vaccination.find({ userId });

  res.json({
    prescriptions,
    medicalHistory,
    vaccinations,
  });
};

module.exports = { getHealthData };
