const {
  getPastAppointments,
  getAvailability,
  updateAvailability,
  getFutureAppointments,
  getupdateDoctor,
} = require("../controllers/doctor.controller");

const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");

const doctorRouter = Router();

doctorRouter.get(
  "/api/doctor/pastGetAppointments",
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
doctorRouter.put(
  "/api/doctor/updateGetDoctor",
  getupdateDoctor,
  updateAvailability
)
// Rutas del doctor

doctorRouter.get("/api/doctor/pastFutureAppointments", authenticateToken, getFutureAppointments);


module.exports = doctorRouter;
