const { Models } = require("../db");
const { registerDoctorService } = require("../service/user.service");
const bcrypt = require("bcrypt");

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
        identityDoc: doctor.dni,
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

async function seedPatients() {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);
    const body = {
      email: "patient@gmail.com",
      password: hashedPassword,
      name: "Patient",
      lastName: "One",
      identityDoc: "12345678",
      gender: "masculino",
      phone: 0,
    };
    await Models.Patient.create(body)
      .then((result) => {
        console.log("Data inserted:", result);
      })
      .catch((error) => {
        console.error(
          `Error inserting PATIENT name="${body.name}", id="${body.id}":`
        );
      });
    console.log("Especialidades agregadas con éxito.");
  } catch (error) {}
}

async function seedLabAnalysts() {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);
    const body = {
      email: "lab@gmail.com",
      password: hashedPassword,
      name: "Lab",
      lastName: "One",
      identityDoc: "12345678",
      gender: "masculino",
      phone: 0,
      nroColegitura: 123,
    };
    await Models.LabAnalyst.create(body)
      .then((result) => {
        console.log("Data inserted:", result);
      })
      .catch((error) => {
        console.error(
          `Error inserting LAB name="${body.name}", id="${body.id}":`
        );
      });
    console.log("Especialidades agregadas con éxito.");
  } catch (error) {}
}

async function seedAdministrator() {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);
    const body = {
      email: "admin@gmail.com",
      password: hashedPassword,
    };
    await Models.Administrator.create(body)
      .then((result) => {
        console.log("Data inserted:", result);
      })
      .catch((error) => {
        console.error(
          `Error inserting ADMINISTRATOR name="${body.name}", id="${body.id}":`
        );
      });
    console.log("Especialidades agregadas con éxito.");
  } catch (error) {}
}

const loadData = async () => {
  const seeders = [
    seedSpecialties,
    seedDoctors,
    seedPatients,
    seedLabAnalysts,
    seedAdministrator,
  ];

  for (let seed of seeders) {
    await seed();
  }
};

module.exports = loadData;
