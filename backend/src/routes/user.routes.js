const Router = require("express");
const {
  loginUser,
  registerDoctor,
  registerPatient,
  loginPatient,
} = require("../controllers/user.controller");
const {
  userLoginValidate,
  patientRegisterValidate,
  doctorRegisterValidate,
} = require("../validations/user.validation");

const userRouter = Router();

// userRouter.post("/api/login", userLoginValidate, loginUser);
userRouter.post("/api/loginPatient", userLoginValidate, loginPatient);

userRouter.post("/api/registerPatient", patientRegisterValidate, registerPatient);
// userRouter.post("/api/registerMedico", doctorRegisterValidate, registerDoctor);
// userRouter.post(
//   "/api/registerPaciente",
//   patientRegisterValidate,
//   registerPatient
// );

module.exports = userRouter;
