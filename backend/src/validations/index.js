const { LoginValidator } = require("./login.validation");
const {
  PatientRegistrationValidator,
} = require("./patientRegister.validation");
const { WorkerRegistrationValidator } = require("./workerRegister.validation");

function loginValidator(req, res, next) {
  const loginValidator = new LoginValidator();
  loginValidator.validate(req, res, next);
}

function patientRegistrationValidator(req, res, next) {
  const patientRegistrationValidator = new PatientRegistrationValidator();
  patientRegistrationValidator.validate(req, res, next);
}

function workerRegistrationValidator(req, res, next) {
  const workerRegistrationValidator = new WorkerRegistrationValidator();
  workerRegistrationValidator.validate(req, res, next);
}

module.exports = {
  loginValidator,
  patientRegistrationValidator,
  workerRegistrationValidator,
};
