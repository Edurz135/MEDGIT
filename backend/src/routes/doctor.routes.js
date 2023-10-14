const { getPastAppointments } = require("../controllers/doctor.controller");
const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");

const doctorRouter = Router();

doctorRouter.get("/api/doctor/pastGetAppointments", authenticateToken, getPastAppointments);

module.exports = doctorRouter;
