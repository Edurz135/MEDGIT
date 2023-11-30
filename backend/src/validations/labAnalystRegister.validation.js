const { BaseValidator } = require("./base.validation.js");

class LabRegistrationValidator extends BaseValidator {
  constructor() {
    super();
  }

  validate(req, res, next) {
    if (!super.validateRequiredFields(req, ["name", "password"])) {
      super.sendErrorResponse(res);
    } else if (!this.validatePasswordLength(req, 6)) {
      super.sendErrorResponse(res);
    } else if (!this.validateEmailFormat(req)) {
      super.sendErrorResponse(res);
    } else {
      next();
    }
  }
}

module.exports = { LabRegistrationValidator };
