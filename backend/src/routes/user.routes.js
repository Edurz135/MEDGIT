const Router = require("express");
const {
  registerDoctor,
  registerPatient,
  registerLabAnalyst,
  loginPatient,
  loginDoctor,
  loginLabAnalyst,
} = require("../controllers/user.controller");
const {
  patientRegisterValidator,
  labAnalystRegisterValidator,
  doctorRegisterValidator,
  loginValidator,
} = require("../validations/user.validation");

const userRouter = Router();

userRouter.post("/api/loginPatient", loginValidator, loginPatient);
userRouter.post("/api/loginDoctor", loginValidator, loginDoctor);
userRouter.post("/api/loginLabAnalyst",loginValidator,loginLabAnalyst);

userRouter.post(
  "/api/registerPatient",
  patientRegisterValidator,
  registerPatient
);
userRouter.post("/api/registerDoctor", doctorRegisterValidator, registerDoctor);
userRouter.post("/api/registerLabAnalyst",labAnalystRegisterValidator, registerLabAnalyst);

module.exports = userRouter;
