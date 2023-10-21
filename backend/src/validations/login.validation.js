const { BaseValidator } = require("./base.validation.js");

class LoginValidator extends BaseValidator {
  constructor() {
    super();
  }

  validate(req, res, next) {
    if (!super.validateRequiredFields(req, ["email", "password"])) {
      return super.sendErrorResponse(res);
    } else if (!super.validateEmailFormat(req)) {
      return super.sendErrorResponse(res);
    } else if (!super.validatePasswordLength(req, 6)) {
      return super.sendErrorResponse(res);
    } else {
      next();
    }
  }
}

module.exports = { LoginValidator };
