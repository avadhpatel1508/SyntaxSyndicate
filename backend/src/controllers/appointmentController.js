const Appointment = require("../models/appointmentSchema");

/**
 * POST /api/appointments
 */
const bookAppointment = async (req, res) => {
  try {
    const userId = req.result._id;
    const { doctorName, hospitalName, appointmentDate, reason } = req.body;

    if (!doctorName || !appointmentDate || !reason) {
      return res.status(400).json({
        message: "Doctor name, date and reason are required",
      });
    }

    const appointment = await Appointment.create({
      userId,
      doctorName,
      hospitalName,
      appointmentDate,
      reason,
    });

    res.status(201).json({ appointment });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * GET /api/appointments
 */
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      userId: req.result._id,
    }).sort({ appointmentDate: -1 });

    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * PATCH /api/appointments/:id/status
 */
const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;

  const appointment = await Appointment.findOneAndUpdate(
    { _id: req.params.id, userId: req.result._id },
    { status },
    { new: true }
  );

  res.json({ appointment });
};

/**
 * DELETE /api/appointments/:id
 */
const cancelAppointment = async (req, res) => {
  const appointment = await Appointment.findOneAndUpdate(
    { _id: req.params.id, userId: req.result._id },
    { status: "Cancelled" },
    { new: true }
  );

  res.json({ appointment });
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  updateAppointmentStatus,
  cancelAppointment,
};
