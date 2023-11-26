const { Models } = require("../db.js");

const registerMultipleAppointment = async (appointments) => {
  try {
    console.log(appointments)
    const result = await Models.Appointment.bulkCreate(await appointments);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  registerMultipleAppointment,
};
