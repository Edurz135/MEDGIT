const { getPastAppointments, getFutureAppointments } = require("../controllers/doctor.controller");
const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");

const doctorRouter = Router();
// Rutas del doctor
doctorRouter.get("/api/doctor/pastGetAppointments", authenticateToken, getPastAppointments);
doctorRouter.get("/api/doctor/pastFutureAppointments", authenticateToken, getFutureAppointments);

module.exports = doctorRouter;
