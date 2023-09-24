const UserService = require("../service/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// get - Select
// post - insert/create
// put - update
// delete - delete

const registerPaciente = async (req, res) => {
  try {
    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const result = await UserService.registerPacienteApi(
      username,
      hashedPassword
    );
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Patient Created",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const registerMedico = async (req, res) => {
  try {
    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const result = await UserService.registerMedicoApi(
      username,
      hashedPassword
    );
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Doctor Created",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const username = req.body.username;
    var user = undefined;
    if (req.body.type == "paciente") {
      user = await UserService.getPacienteApi(username);
    } else {
      user = await UserService.getMedicoApi(username);
    }
    const match = await bcrypt.compare(
      req.body.password,
      user.dataValues.contrasena
    );
    const accessToken = jwt.sign(
      JSON.stringify(user),
      "token secret, need to be changed"
    );
    if (match) {
      return res.status(200).json({
        status: 200,
        accessToken: accessToken,
        message: "Succesfully User Logging",
      });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid credentials" });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  loginUser,
  registerMedico,
  registerPaciente,
};
