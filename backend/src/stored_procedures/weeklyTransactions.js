const dayjs = require("dayjs");
const { Models, db } = require("../db");

const Intervals = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
];

// debe ser llamado cada lunes a las 0:00 horas
const deleteAllAppointmentsService = async () => {
  try {
    await Models.Appointment.destroy({ where: { state: 0 } });
  } catch (e) {
    throw Error("Error while creating all Appointments: " + e);
  }
};

// debe ser llamado cada lunes a las 0:00 horas
const createAllAppointmentsService = async () => {
  try {
    const doctors = await Models.Doctor.findAll({ attributes: ["id"] });
    doctors.map((doctor, idx) => {
      const doctorId = doctor.dataValues.id;
      createAppointmentsService(doctorId);
    });
  } catch (e) {
    throw Error("Error while creating all Appointments: " + e);
  }
};

const createAppointmentsService = async (doctorId) => {
  try {
    const doctor = await Models.Doctor.findOne({
      where: { id: doctorId },
    });

    const availabilities = [
      "mondayDisponibility",
      "tuesdayDisponibility",
      "wednesdayDisponibility",
      "thursdayDisponibility",
      "fridayDisponibility",
      "saturdayDisponibility",
      "sundayDisponibility",
    ];

    availabilities.map((key, idx) => {
      const curAvailability = doctor[key]; // "001110110000"
      const chars = curAvailability.split(""); // ["0", "0", "1", "1", ...]
      const curDate = dayjs().day(idx + 1); // get monday date of the week
      chars.map(async (char, idx) => {
        const interval = Intervals[idx].split(" - ");
        const startTime = interval[0].split(":");
        const endTime = interval[1].split(":");
        const startDate = curDate
          .set("hour", parseInt(startTime[0], 10))
          .set("minute", parseInt(startTime[1], 10));
        const endDate = curDate
          .set("hour", parseInt(endTime[0], 10))
          .set("minute", parseInt(endTime[1], 10));
        if (char == "1") {
          await Models.Appointment.create({
            startDate: startDate,
            endDate: endDate,
            state: 0,
            intervalDigit: idx,
            DoctorId: doctorId,
            PatientId: null,
          });
        }
      });
    });
  } catch (e) {
    throw Error("Error while creating Appointments: " + e);
  }
};

async function executeWeeklyTransactionIfNeeded() {
  const today = dayjs();
  const lastMonday = today.day(1).startOf("day"); // Establece la fecha al lunes de la semana actual

  // Verifica si la transacción ya se ha ejecutado esta semana
  const transactionRecord = await Models.WeeklyTransaction.findByPk(
    lastMonday.toISOString()
  );

  if (!transactionRecord) {
    // Si no se ha ejecutado, ejecuta la transacción
    await db.sequelize.transaction(async (t) => {
      // Aquí va tu lógica de transacción...
      await deleteAllAppointmentsService();
      await createAllAppointmentsService();

      // Marca la transacción como ejecutada
      await Models.WeeklyTransaction.create(
        { weekOf: lastMonday.toISOString(), executed: true },
        { transaction: t }
      );
    });
  }
}

module.exports = { executeWeeklyTransactionIfNeeded, createAppointmentsService };
