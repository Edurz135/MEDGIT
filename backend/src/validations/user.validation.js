const loginValidator = (req, res, next) => {
  let errorMessage = "";
  if (!req.body.email) {
    errorMessage = "username is email";
  }
  if (!req.body.password) {
    errorMessage = "password is required";
  }
  if (errorMessage) {
    res.status(400).json({ success: false, errorMessage });
  }
  next();
};

const patientRegisterValidator = (req, res, next) => {
  let errorMessage = "";
  if (!req.body.name) {
    errorMessage = "name is required";
  }
  if (!req.body.lastName) {
    errorMessage = "lastName is required";
  }
  if (!req.body.identityDoc) {
    errorMessage = "identityDoc is required";
  }
  if (!req.body.password) {
    errorMessage = "password is required";
  }
  if (req.body.password.length < 5) {
    errorMessage = "password should have atleast 5 characters";
  }
  if (!req.body.gender) {
    errorMessage = "gender is required";
  }
  if (
    req.body.email.match(
      '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
    )
  ) {
    errorMessage = "provide valid email";
  }

  // send error
  if (errorMessage) {
    res.status(400).json({ success: false, errorMessage });
  }

  next();
};

const doctorRegisterValidator = (req, res, next) => {
  let errorMessage = "";
  if (!req.body.name) {
    errorMessage = "username is required";
  }
  if (!req.body.lastName) {
    errorMessage = "lastName is required";
  }
  if (!req.body.identityDoc) {
    errorMessage = "identityDoc is required";
  }
  if (!req.body.password) {
    errorMessage = "password is required";
  }
  if (req.body.password.length < 5) {
    errorMessage = "password should have atleast 5 characters";
  }
  if (!req.body.gender) {
    errorMessage = "gender is required";
  }
  if (
    req.body.email.match(
      '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
    )
  ) {
    errorMessage = "provide valid email";
  }

  // send error
  if (errorMessage) {
    res.status(400).json({ success: false, errorMessage });
  }

  next();
};

module.exports = {
  loginValidator,
  patientRegisterValidator,
  doctorRegisterValidator,
};
