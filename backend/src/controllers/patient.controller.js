const { getPastAppointmentsService } = require("../service/patient.service.js");
const getPastAppointments = async (req, res) => {
  try {
    // Envía el id del paciente
    console.log(req.user);
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
module.exports = {
  getPastAppointments,
};
