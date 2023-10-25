const { Models } = require("../db");
const { registerDoctorService } = require("../service/user.service");
async function seedSpecialties() {
  try {
    const specialties = [
      "Medicina Familiar",
      "Medicina Interna",
      "Endocrinología",
      "Pediatría",
      "Gineco obstetricia",
      "Cirugía",
      "Psiquiatría",
      "Cardiología",
      "Dermatología",
      "Gastroenterología",
      "Infectología",
      "Nefrología",
      "Oftalmología",
      "Otorrinolaringología",
      "Neumología",
      "Neurología",
      "Radiología",
      "Anestesiología",
      "Oncología",
      "Patología",
      "Urología",
      "Medicina física y rehabilitación",
      "Medicina Intensiva",
    ];
    specialties.map((name, id) => {
      Models.Specialty.create({ id: id, name: name });
    });
    console.log("Especialidades agregadas con éxito.");
  } catch (error) {
    console.log("Error al agregar las especialidades:", error);
  }
}

async function seedDoctors() {
  try {
    const doctors = [
      {
        name: "John",
        lastName: "Doe",
        gender: "Male",
      },
      {
        name: "Jane",
        lastName: "Doe",
        gender: "Female",
      },
      {
        name: "Alice",
        lastName: "Smith",
        gender: "Female",
      },
      {
        name: "Bob",
        lastName: "Johnson",
        gender: "Male",
      },
      {
        name: "Charlie",
        lastName: "Brown",
        gender: "Male",
      },
      {
        name: "Daisy",
        lastName: "Miller",
        gender: "Female",
      },
      {
        name: "Edward",
        lastName: "White",
        gender: "Male",
      },
      {
        name: "Fiona",
        lastName: "Green",
        gender: "Female",
      },
      {
        name: "George",
        lastName: "Black",
        gender: "Male",
      },
      {
        name: "Hannah",
        lastName: "Blue",
        gender: "Female",
      },
    ];

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
      registerDoctorService(body);
    });
    console.log("Especialidades agregadas con éxito.");
  } catch (error) {
    console.log("Error al agregar las especialidades:", error);
  }
}

const loadData = async () => {
  const seeders = [seedSpecialties, seedDoctors];

  for (let seed of seeders) {
    await seed();
  }
};

module.exports = loadData;
