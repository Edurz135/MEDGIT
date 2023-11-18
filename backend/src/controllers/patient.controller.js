const {
  getPastAppointmentsService,
  getFutureAppointmentsService,
  getAppointmentDetailsService,
  getListDoctorsService,
  getAvailabilityService,
  getListSpecialtiesService,
  getUpdatePacientService,
  getVisualisePacientService,
  bookAppointmentService,
} = require("../service/patient.service.js");

const getPastAppointments = async (req, res) => {
  try {
    // Envía el id del paciente
    console.log(req.user);
    const result = (await getPastAppointmentsService(req.user.id)) || [];
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Appointments Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
const getAppointmentDetails = async (req, res) => {
  try {
    // Envía el id de la cita
    
    const result = (await getAppointmentDetailsService(req.body.appointmentId)) || [];
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Appointments Details Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
const getListDoctors = async (req, res) => {
  try {
    const result = await getListDoctorsService();
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully list of doctors Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getListSpecialties = async (req, res) => {
  try {
    const result = await getListSpecialtiesService();
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully list of specialties Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getAvailability = async (req, res) => {
  try {
    const result = await getAvailabilityService(
      req.body.doctorId,
      req.body.specialtyId
    );
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully availability list Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getFutureAppointments = async (req, res) => {
  try {
    // Envía el id del paciente
    const result = (await getFutureAppointmentsService(req.user.id)) || [];
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Appointments Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    // Envía el id del paciente
    const result = await bookAppointmentService(
      req.user.id,
      req.body.appointmentId
    );
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Appointments Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
const getupdatePacient = async (req, res) => {
  try {
    const result = await getUpdatePacientService(
      req.user.id,
      req.body.email,
      req.body.password,
      req.body.phone
    );
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Pacient Update",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
const getVisualisePacient = async (req, res) => {
  try {
    const result = await getVisualisePacientService(req.user.id) || [];

    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Pacient Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
module.exports = {
  getPastAppointments,
  getAppointmentDetails,
  getListDoctors,
  getAvailability,
  getListSpecialties,
  getFutureAppointments,
  getupdatePacient,
  getVisualisePacient,
  bookAppointment,
};
