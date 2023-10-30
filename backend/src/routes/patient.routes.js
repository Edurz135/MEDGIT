const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");

const {
  getPastAppointments,
  getListDoctors,
  getAvailability,
  getListSpecialties,
  getFutureAppointments,
  bookAppointment,
} = require("../controllers/patient.controller");

const patientRouter = Router();

// Rutas del paciente
patientRouter.get(
  "/api/patient/pastGetAppointments",
  authenticateToken,
  getPastAppointments
);
patientRouter.get(
  "/api/patient/FutureGetAppointments",
  authenticateToken,
  getFutureAppointments
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

patientRouter.post(
  "/api/patient/bookAppointment",
  authenticateToken,
  bookAppointment
);

module.exports = patientRouter;
