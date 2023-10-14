const Router = require("express");
const patientRouter = Router();
const { authenticateToken } = require("../middlewares/auth.middleware");
const { getPastAppointments } = require("../controllers/patient.controller");
patientRouter.get("/api/patient/pastGetAppointments",  authenticateToken, getPastAppointments);

module.exports = patientRouter;