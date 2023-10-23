const {
  getPastAppointments,
  getDisponibility,
  updateDisponibility,
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
  "/api/doctor/getDisponibility",
  authenticateToken,
  getDisponibility
);
doctorRouter.post(
  "/api/doctor/updateDisponibility",
  authenticateToken,
  updateDisponibility
);

module.exports = doctorRouter;
