const {
  getPastAppointmentsService,
  getFutureAppointmentsService,
  getAppointmentDetailsService,
  getAvailabilityService,
  getUpdateDoctorService,
  getVisualiseDoctorService,
  updateAvailabilityService,
  getFutureAppointmentDetailService,
  getListTypesMedicalExamsService,
  updateAppointmentService,
} = require("../service/doctor.service.js");
const getPastAppointments = async (req, res) => {
  try {
    // Envía el id del paciente
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
const getFutureAppointments = async (req, res) => {
  try {
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

const getFutureAppointmentDetail = async (req, res) => {
  try {
    const result =
      (await getFutureAppointmentDetailService(req.body.appointmentId)) || [];
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Appointments Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
const getAppointmentsDetails = async (req, res) => {
  try {
    // Envía el id de la cita
    const result =
      (await getAppointmentDetailsService(req.body.appointmentId)) || [];
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Appointments Details Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
const getAvailability = async (req, res) => {
  try {
    console.log(req.user);
    // Envía el id del paciente
    const result = await getAvailabilityService(req.user.id);
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Appointments Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const updateAvailability = async (req, res) => {
  try {
    const result = await updateAvailabilityService(req.user.id, req.body);
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Doctor disponibility updated",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
const getupdateDoctor = async (req, res) => {
  try {
    const result = await getUpdateDoctorService(req.body, req.user.id);
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Doctor Update",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
const getVisualiseDoctor = async (req, res) => {
  try {
    const result = (await getVisualiseDoctorService(req.user.id)) || [];
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Doctor Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    console.log(req.body.data.examenesLab)
    const result = (await updateAppointmentService(req.body.data)) || [];

    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Doctor Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const getListTypesMedicalExams = async (req, res) => {
  try {
    const result = (await getListTypesMedicalExamsService(req.body.data)) || [];

    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Doctor Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

module.exports = {
  getPastAppointments,
  getFutureAppointments,
  getAppointmentsDetails,
  getAvailability,
  getupdateDoctor,
  getVisualiseDoctor,
  updateAvailability,
  getFutureAppointmentDetail,
  getAppointmentsDetails,
  updateAppointment,
  getListTypesMedicalExams,
};
