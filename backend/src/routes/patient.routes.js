const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");
const { getPastAppointments, 
    getFutureAppointments } = require("../controllers/patient.controller");

const patientRouter = Router();
// Rutas del paciente
patientRouter.get("/api/patient/pastGetAppointments",  authenticateToken, getPastAppointments);
patientRouter.get("/api/patient/FutureGetAppointments",  authenticateToken, getFutureAppointments);

module.exports = patientRouter;