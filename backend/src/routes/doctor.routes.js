const {
  getPastAppointments,
  getFutureAppointmentDetail,
  getAvailability,
  updateAvailability,
  getFutureAppointments,
  getVisualiseDoctor,
  getAppointmentsDetails,
  getupdateDoctor,
  updateAppointment,
  getListTypesMedicalExams,
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
  authenticateToken,
  getupdateDoctor,
);
doctorRouter.get(
  "/api/doctor/getVisualiseDoctor",
  authenticateToken,
  getVisualiseDoctor
);
// Rutas del doctor

doctorRouter.get(
  "/api/doctor/getFutureAppointments",
  authenticateToken,
  getFutureAppointments
);

doctorRouter.post(
  "/api/doctor/getFutureAppointmentDetail",
  authenticateToken,
  getFutureAppointmentDetail
);

doctorRouter.put(
  "/api/doctor/updateAppointment",
  authenticateToken,
  updateAppointment
);

doctorRouter.get(
  "/api/doctor/getListTypesMedicalExams",
  authenticateToken,
  getListTypesMedicalExams
);

module.exports = doctorRouter;
