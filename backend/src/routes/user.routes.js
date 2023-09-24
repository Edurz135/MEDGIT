const Router = require("express");
const {
  loginUser,
  registerMedico,
  registerPaciente,
} = require("../controllers/user.controller");
const { userLoginValidate, patientRegisterValidate, doctorRegisterValidate } = require("../validations/user.validation");

const userRouter = Router();

userRouter.post("/api/login", userLoginValidate, loginUser);

userRouter.post("/api/registerMedico", doctorRegisterValidate, registerMedico);
userRouter.post("/api/registerPaciente", patientRegisterValidate, registerPaciente);

module.exports = userRouter;
