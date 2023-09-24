const userLoginValidate = (req, res, next) => {
  let errorMessage = "";
  if (!req.body.username) {
    errorMessage = "username is required";
  }
  if (!req.body.password) {
    errorMessage = "password is required";
  }
  if (!req.body.type) {
    errorMessage = "type is required";
  }

  //   if (req.body.password.length < 5) {
  //     errorMessage = "password should have atleast 5 characters";
  //   }
  //   if (
  //     req.body.email.match(
  //       '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
  //     )
  //   ) {
  //     errorMessage = "provide valid email";
  //   }

  // send error
  if (errorMessage) {
    res.status(400).json({ success: false, errorMessage });
  }

  next();
};

const patientRegisterValidate = (req, res, next) => {
  let errorMessage = "";
  if (!req.body.username) {
    errorMessage = "username is required";
  }
  if (!req.body.password) {
    errorMessage = "password is required";
  }
  if (req.body.password.length < 5) {
    errorMessage = "password should have atleast 5 characters";
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

const doctorRegisterValidate = (req, res, next) => {
    let errorMessage = "";
    if (!req.body.username) {
      errorMessage = "username is required";
    }
    if (!req.body.password) {
      errorMessage = "password is required";
    }
    if (req.body.password.length < 5) {
      errorMessage = "password should have atleast 5 characters";
    }
    if (!req.body.nro_colegiatura) {
        errorMessage = "nro_colegiatura is required";
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
  userLoginValidate,
  patientRegisterValidate,
  doctorRegisterValidate,
};
