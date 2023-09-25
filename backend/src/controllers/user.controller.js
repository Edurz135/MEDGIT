const {
  registerPatientService,
  loginPatientService,
} = require("../service/user.service");

const registerPatient = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const result = await registerPatientService(email, password);
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Patient Created",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const registerDoctor = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const result = await UserService.registerDoctorService(username, password);
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Doctor Created",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const loginPatient = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const accessToken = await loginPatientService(email, password);
    return res.status(200).json({
      status: 200,
      accessToken: accessToken,
      message: "Succesfully User Logging",
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid credentials" });
  }
};

module.exports = {
  registerDoctor,
  registerPatient,
  loginPatient,
};
