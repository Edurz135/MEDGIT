const {
  getPastAppointmentsService
}  = require("../service/doctor.service.js");
const getPastAppointments = async (req, res) => {
    try {
      // Envía el id del paciente
        const result = await getPastAppointmentsService(req.body.PatientId);
        return res.status(200).json({
          status: 200,
          result: result,
          message: "Succesfully Appointsments Returned",
        });
      } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
      } 
}


module.exports = {
  getPastAppointments
  
};