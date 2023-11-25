const axios = require("axios");
require("dotenv").config();

const LoginDoctor = async (doctorBody) => {
  const res = await axios.post(
    "http://localhost:3100/api/loginDoctor",
    doctorBody
  );
  return res.data;
};

const GetPastAppointments = async (accessToken) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3100/api/doctor/getPastAppointments",
    headers: {
      Authorization: accessToken,
    },
  };

  const res = await axios.request(config);
  return res.data;
};

const GetDoctorAvailability = async (accessToken) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3100/api/doctor/getAvailability",
    headers: {
      Authorization: accessToken,
    },
  };

  const res = await axios.request(config);
  return res.data;
};

describe("########## DOCTOR TESTS", () => {
  var accessToken = "";
  const doctorBody = { email: "Carlos@gmail.com", password: "123456" };

  beforeAll(async () => {
    // Storing the doctor token that will be useful to execute the rest of the tests
    await LoginDoctor(doctorBody).then((res) => {
      accessToken = res.accessToken;
    });
  });

  describe("GET /api/doctor/getPastAppointments", () => {
    it("Debería retornar el status 200 y el resultado debe ser un arreglo", async () => {
      GetPastAppointments(accessToken).then((res) => {
        expect(Array.isArray(res.result)).toBe(true);
        expect(res.status).toEqual(200);
      });
    });
  });

  describe("GET /api/doctor/getAvailability", () => {
    it("Debería retornar el status 200 y el contenido de resultado no debe ser nulo", async () => {
      GetDoctorAvailability(accessToken).then((res) => {
        expect(res.result.mondayDisponibility != null).toBe(true);
        expect(res.result.tuesdayDisponibility != null).toBe(true);
        expect(res.result.wednesdayDisponibility != null).toBe(true);
        expect(res.result.thursdayDisponibility != null).toBe(true);
        expect(res.result.fridayDisponibility != null).toBe(true);
        expect(res.result.saturdayDisponibility != null).toBe(true);
        expect(res.result.sundayDisponibility != null).toBe(true);
        expect(res.status).toEqual(200);
      });
    });
  });
});
