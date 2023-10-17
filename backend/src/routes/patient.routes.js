const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");
const { getPastAppointments } = require("../controllers/patient.controller");

const patientRouter = Router();

patientRouter.post("/api/patient/pastGetAppointments",  authenticateToken, getPastAppointments);

module.exports = patientRouter;