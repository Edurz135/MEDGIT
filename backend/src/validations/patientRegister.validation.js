const { BaseValidator } = require("./base.validation.js");

class PatientRegistrationValidator extends BaseValidator {
  constructor() {
    super();
  }

  async validate(req, res, next) {
    if (
      !super.validateRequiredFields(req, [
        "name",
        "lastName",
        "identityDoc",
        "password",
        "gender",
      ])
    ) {
      super.sendErrorResponse(res);
    } else if (!super.validatePasswordLength(req, 6)) {
      super.sendErrorResponse(res);
    } else if (!super.validateNames(req, ["name", "lastName"])) {
      super.sendErrorResponse(res);
    } else if (!super.validateEmailFormat(req)) {
      super.sendErrorResponse(res);
    } else if (!super.validateIdentityDocument(req, 'identityDoc')) {
      super.sendErrorResponse(res);
    } else {
      next();
    }
  }
}

module.exports = { PatientRegistrationValidator };