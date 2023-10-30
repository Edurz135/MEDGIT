const { Models } = require("../db.js");
// const { Op } = require("sequelize");

// Trae citas pasadas: fecha, tiempo, tipo, diagnostico y comentario
const getPastAppointmentsService = async (PatientId) => {
  try {
    const appointments = await Models.Appointment.findAll({
      attributes: ["date", "time", "type", "diagnostic"],
      where: {
        PatientId: PatientId,
        pending: false,
      },
      /* include: [
        {
          model: Models.ExaMed,
          attributes: ["comment"],
          where: {
            state: 0,
          },
        },
      ], */
    });
    return appointments;
  } catch (error) {
    throw new Error(e.message);
  }
};

const getListDoctorsService = async () => {
  try {
    const result = await Models.Doctor.findAll({
      attributes: ["id", "name", "lastName"],
    });
    return result;
  } catch (error) {
    throw new Error(e.message);
  }
};

const getListSpecialtiesService = async () => {
  try {
    const result = await Models.Specialty.findAll({
      attributes: ["id", "name"],
    });
    return result;
  } catch (error) {
    throw new Error(e.message);
  }
};

const getAvailabilityService = async (doctorId, specialtyId) => {
  // days -1 1234567
  try {
    // const temp = {
    //   1: "mondayDisponibility",
    //   2: "tuesdayDisponibility",
    //   3: "wednesdayDisponibility",
    //   4: "thursdayDisponibility",
    //   5: "fridayDisponibility",
    //   6: "saturdayDisponibility",
    //   7: "sundayDisponibility",
    // };

    // const days = "1234567";
    const conditionals = {};
    if (doctorId != "-1") conditionals.id = doctorId;
    if (specialtyId != "-1") conditionals.SpecialtyId = specialtyId;
    // const tempConditional = [];
    // {
    //   [Op.or]: [
    //     {
    //       mondayDisponibility: {
    //         [Op.like]: '%1%'
    //       }
    //     },
    //     {
    //       tuesdayDisponibility: {
    //         [Op.like]: '%1%'
    //       }
    //     }
    //   ]
    // }

    // if (days != "-1") {
    //   days.split("").map((digit) => {
    //     const param = {};
    //     const attrib = temp[parseInt(digit)];
    //     param[attrib] = {
    //       [Op.like]: "%1%",
    //     };
    //     tempConditional.push(param);
    //   });
    // }

    const result = await Models.Doctor.findAll({
      // attributes: ["date", "time", "type", "diagnostic"],
      where: conditionals,
      include: [
        {
          model: Models.Specialty,
          attributes: ["name"],
        },
      ],
    });
    console.log(result)
    return result;
  } catch (error) {
    throw new Error(e.message);
  }
};

const getFutureAppointmentsService = async (PatientId) => {
  try {
    const appointments = await Models.Appointment.findAll({
      attributes: ['date', 'time', 'type', 'diagnostic'],
      where: {
        PatientId: PatientId,
        pending: true,
      },
      /* include: [
        {
          model: Models.ExaMed,
          attributes: ['comment'],
          where: {
            state: 1,
          },
        },
      ], */
    });

    return appointments
  } catch (e) {
    throw new Error(e.message);
  }
};
module.exports = {
  getPastAppointmentsService,
  getFutureAppointmentsService,
  getListDoctorsService,
  getAvailabilityService,
  getListSpecialtiesService,

};
