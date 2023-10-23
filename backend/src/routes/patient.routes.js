const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");
const {
  getPastAppointments,
  getListDoctors,
  getAvailability,
  getListSpecialties,
} = require("../controllers/patient.controller");

const patientRouter = Router();

patientRouter.get(
  "/api/patient/pastGetAppointments",
  authenticateToken,
  getPastAppointments
);

patientRouter.get(
  "/api/patient/listDoctors",
  authenticateToken,
  getListDoctors
);

patientRouter.get(
  "/api/patient/listSpecialties",
  authenticateToken,
  getListSpecialties
);

patientRouter.post(
  "/api/patient/availabilityList",
  authenticateToken,
  getAvailability
);

module.exports = patientRouter;
