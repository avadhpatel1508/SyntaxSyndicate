const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");
const MedicalRecord = require("../models/MedicalRecord");
const Vaccination = require("../models/Vaccination");

exports.bookAppointment = async (req, res) => {
  const appointment = await Appointment.create({
    ...req.body,
    user: req.user._id,
  });
  res.status(201).json(appointment);
};

exports.getAppointments = async (req, res) => {
  const data = await Appointment.find({ user: req.user._id }).sort("-createdAt");
  res.json(data);
};

exports.getPrescriptions = async (req, res) => {
  const data = await Prescription.find({ user: req.user._id });
  res.json(data);
};

exports.getMedicalHistory = async (req, res) => {
  const data = await MedicalRecord.find({ user: req.user._id });
  res.json(data);
};

exports.getVaccinations = async (req, res) => {
  const data = await Vaccination.find({ user: req.user._id });
  res.json(data);
};
