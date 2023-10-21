class BaseValidator {
  constructor() {
    this.errorMessage = "";
  }

  validateRequiredFields(req, fields) {
    for (const field of fields) {
      if (!req.body[field] || req.body[field].trim() === "") {
        this.errorMessage = `${field} is required and cannot be empty or contain only spaces`;
        return false;
      }
    }
    return true;
  }

  validateNames(req, fields) {
    const nameRegex = /^[A-Za-z]+$/;

    for (const field of fields) {
      if (!String(req.body[field]).match(nameRegex)) {
        this.errorMessage = `${field} must be a valid name`;
        return false;
      }
    }
    return true;
  }

  validatePasswordLength(req, minPasswordLength) {
    if (req.body.password.length < minPasswordLength) {
      this.errorMessage = `password should have at least ${minPasswordLength} characters`;
      return false;
    }
    return true;
  }

  validateEmailFormat(req) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!String(req.body.email).toLowerCase().match(emailRegex)) {
      this.errorMessage = "provide a valid email";
      return false;
    }
    return true;
  }

  validateIntegers(req, fields) {
    for (const field of fields) {
      if (!/^[0-9]*$/.test(req.body[field])) {
        this.errorMessage = `${field} must be an integer`;
        return false;
      }
    }
    return true;
  }

  validatePhoneNumbers(req, fields) {
    const phoneRegex = /^\d{10}$/; // You can adjust the regular expression based on your specific phone number format.

    for (const field of fields) {
      if (!phoneRegex.test(req.body[field])) {
        this.errorMessage = `${field} must be a valid phone number`;
        return false;
      }
    }
    return true;
  }

  validateIdentityDocument(req, field) {
    this.errorMessage = ""; // Reset errorMessage
    const idRegex = /^[A-Z0-9]{8}$/; // You can adjust the regular expression based on your specific identity document format.

    if (!idRegex.test(req.body[field])) {
      this.errorMessage = `${field} must be a valid identity document. It must have 8 digits`;
      return false;
    }
    return true;
  }

  sendErrorResponse(res) {
    return res
      .status(400)
      .json({ success: false, errorMessage: this.errorMessage });
  }
}

module.exports = { BaseValidator };
