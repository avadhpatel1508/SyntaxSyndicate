const appointmentrouter = require("express").Router();
const userMiddleware = require("../middleware/userMiddleware");
const controller = require("../controllers/appointmentController");

appointmentrouter.post("/", userMiddleware, controller.bookAppointment);
appointmentrouter.get("/", userMiddleware, controller.getMyAppointments);
appointmentrouter.patch("/:id/status", userMiddleware, controller.updateAppointmentStatus);
appointmentrouter.delete("/:id", userMiddleware, controller.cancelAppointment);

module.exports = appointmentrouter;
