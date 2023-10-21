const { BaseValidator } = require("./base.validation.js");

class WorkerRegistrationValidator extends BaseValidator {
  constructor(minPasswordLength) {
    super();
    this.minPasswordLength = minPasswordLength;
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
    } else if (!this.validatePasswordLength(req, this.minPasswordLength)) {
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
