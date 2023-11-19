const { BaseValidator } = require("./base.validation.js");

class WorkerRegistrationValidator extends BaseValidator {
  constructor() {
    super();
  }

  validate(req, res, next) {
    if (
      !super.validateRequiredFields(req, [
        "name",
        "lastName",
        "identityDoc",
        "password",
        "gender",
        "nroColegiatura",
      ])
    ) {
      super.sendErrorResponse(res);
    } else if (!this.validatePasswordLength(req, 6)) {
      super.sendErrorResponse(res);
    } else if (!this.validateEmailFormat(req)) {
      super.sendErrorResponse(res);
    } else if (!super.validateNames(req, ["name", "lastName"])) {
      super.sendErrorResponse(res);
    } else if (!super.validateIdentityDocument(req, "identityDoc")) {
      super.sendErrorResponse(res);
    } else if (!super.validateIntegers(req, ["nroColegiatura"])) {
      super.sendErrorResponse(res);
    } else {
      next();
    }
  }
}

module.exports = { WorkerRegistrationValidator };
