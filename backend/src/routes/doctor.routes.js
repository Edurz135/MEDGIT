const {
  getPastAppointments,
  getAppointmentsDetails,
  getAvailability,
  updateAvailability,
  getFutureAppointments,
  getupdateDoctor,
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
  "/api/doctor/getAppointmentsDetails",
  authenticateToken,
  getAppointmentsDetails
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
doctorRouter.put(
  "/api/doctor/updateGetDoctor",
  getupdateDoctor,
  updateAvailability
)
// Rutas del doctor

doctorRouter.get(
  "/api/doctor/getFutureAppointments", authenticateToken, 
  getFutureAppointments);


module.exports = doctorRouter;
