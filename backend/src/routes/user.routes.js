const Router = require("express");
const {
  registerDoctor,
  registerPatient,
  loginPatient,
  loginDoctor,
} = require("../controllers/user.controller");
const {
  patientRegisterValidator,
  doctorRegisterValidator,
  loginValidator,
} = require("../validations/user.validation");

const userRouter = Router();

userRouter.post("/api/loginPatient", loginValidator, loginPatient);
userRouter.post("/api/loginDoctor", loginValidator, loginDoctor);

userRouter.post(
  "/api/registerPatient",
  patientRegisterValidator,
  registerPatient
);
userRouter.post("/api/registerDoctor", doctorRegisterValidator, registerDoctor);

module.exports = userRouter;
