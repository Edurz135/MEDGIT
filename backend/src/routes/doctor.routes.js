const {
  getPastAppointments,
  getAppointmentsDetails,
  getAvailability,
  updateAvailability,
  getFutureAppointments,
} = require("../controllers/doctor.controller");

const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");

const doctorRouter = Router();

doctorRouter.get(
  "/api/doctor/getPastAppointments",
  authenticateToken,
  getPastAppointments
);
doctorRouter.get(
  "/api/doctor/getAvailability",
  authenticateToken,
  getAvailability
);
doctorRouter.post(
  "/api/doctor/updateAvailability",
  authenticateToken,
  updateAvailability
);

// Rutas del doctor

doctorRouter.get(
  "/api/doctor/getFutureAppointments", authenticateToken, 
  getFutureAppointments);


module.exports = doctorRouter;
