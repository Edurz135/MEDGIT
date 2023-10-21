const { getPastAppointmentsService } = require("../service/doctor.service.js");
const getPastAppointments = async (req, res) => {
  try {
    console.log(req.user);
    // Envía el id del paciente
    const result = await getPastAppointmentsService(req.user.id) || [];
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Appointments Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
const getFutureAppointments = async (req, res) => {
  try {
    console.log(req.user);
    // Envía el id del paciente
    const result = await getFutureAppointmentsService(req.user.id) || [];
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Appointments Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
module.exports = {
  getPastAppointments,
  getFutureAppointments
};
