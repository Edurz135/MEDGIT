const {
  getPastAppointmentsService,
  getAvailabilityService,
  getUpdateDoctorService,
  getVisualiseDoctorService,
  updateAvailabilityService,
} = require("../service/doctor.service.js");
const getPastAppointments = async (req, res) => {
  try {
    console.log(req.user);
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

  console.log(req.body);
  try {
    const result = await getUpdateDoctorService(
      req.user.id,
      req.body.email,
      req.body.password,
      req.body.phone
    );
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
    const result = await getVisualiseDoctorService(req.user.id) || [];

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
  getAvailability,
  getupdateDoctor,
  getVisualiseDoctor,
  updateAvailability,
};
