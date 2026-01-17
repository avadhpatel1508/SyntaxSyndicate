const express = require("express");
const healthcareRouter = express.Router();
const auth = require("../middleware/userMiddleware");

const {
  bookAppointment,
  getAppointments,
  getPrescriptions,
  getMedicalHistory,
  getVaccinations,
} = require("../controllers/healthcareController");

healthcareRouter.post("/appointments", auth, bookAppointment);
healthcareRouter.get("/appointments", auth, getAppointments);
healthcareRouter.get("/prescriptions", auth, getPrescriptions);
healthcareRouter.get("/medical-history", auth, getMedicalHistory);
healthcareRouter.get("/vaccinations", auth, getVaccinations);

module.exports = healthcareRouter;
