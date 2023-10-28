const Router = require("express");
const {
  registerDoctor,
  registerPatient,
  registerLabAnalyst,
  loginPatient,
  loginDoctor,
  loginLabAnalyst,
  createAppointments,
} = require("../controllers/user.controller");

const { loginValidator, patientRegistrationValidator, workerRegistrationValidator } = require("../validations");

const userRouter = Router();

userRouter.post("/api/loginPatient", loginValidator, loginPatient);
userRouter.post("/api/loginDoctor", loginValidator, loginDoctor);
userRouter.post("/api/loginLabAnalyst", loginValidator, loginLabAnalyst);

userRouter.post("/api/registerPatient", patientRegistrationValidator, registerPatient);
userRouter.post("/api/registerDoctor", workerRegistrationValidator, registerDoctor);
userRouter.post("/api/registerLabAnalyst", workerRegistrationValidator, registerLabAnalyst);
userRouter.post("/api/createAppointments", createAppointments);

module.exports = userRouter;
