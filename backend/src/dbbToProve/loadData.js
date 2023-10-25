const { Models } = require("../db");
const { registerDoctorService } = require("../service/user.service");
async function seedSpecialties() {
  try {
    const specialties = require("./specialty.data");
    specialties.map((name, id) => {
      Models.Specialty.create({ id: id, name: name })
        .then((result) => {
          console.log("Data inserted:", result);
        })
        .catch((error) => {
          console.error(
            `Error inserting SPECIALTY name="${name}", id="${id}":`
          );
        });
    });
    console.log("Especialidades agregadas con éxito.");
  } catch (error) {}
}

async function seedDoctors() {
  try {
    const doctors = require("./doctors.data");

    doctors.map((doctor, id) => {
      const body = {
        id: id,
        name: doctor.name,
        lastName: doctor.lastName,
        gender: doctor.gender,
        specialtyId: id % 28,
        nroColegitura: 123,
        identityDoc: 12345678,
        password: "123456",
        email: doctor.name + "@gmail.com",
      };
      registerDoctorService(body)
        .then((result) => {
          console.log("Data inserted:", result);
        })
        .catch((error) => {
          console.error(
            `Error inserting DOCTOR name="${body.name}", id="${body.id}":`
          );
        });
    });
    console.log("Especialidades agregadas con éxito.");
  } catch (error) {}
}

const loadData = async () => {
  const seeders = [seedSpecialties, seedDoctors];

  for (let seed of seeders) {
    await seed();
  }
};

module.exports = loadData;
