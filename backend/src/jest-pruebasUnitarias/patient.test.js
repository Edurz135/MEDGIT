const axios = require("axios");
require("dotenv").config();
const LoginPatient = async (patientBody) => {
    const res = await axios.post(
      "http://localhost:3100/api/loginPatient",
      patientBody
    );
    return res.data;
  };
  const GetPastAppointments = async (accessToken) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3100/api/paciente/getPastAppointments",
      headers: {
        Authorization: accessToken,
      },
    };
  
    const res = await axios.request(config);
    return res.data;
  };
  const GetFutureAppointments = async (accessToken) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3100/api/paciente/getFutureAppointments",
      headers: {
        Authorization: accessToken,
      },
    };
  
    const res = await axios.request(config);
    return res.data;
  };
  describe("########## PATIENT TESTS", () => {
    var accessToken = "";
    const patientBody = { email: "patient@gmail.com", password: "123456" };
  
    beforeAll(async () => {
     
      await LoginPatient(patientBody).then((res) => {
        accessToken = res.accessToken;
      });
    });
  
    describe("GET /api/patient/getPastAppointments", () => {
      it("Debería retornar el status 200 y el resultado debe ser un arreglo", async () => {
        GetPastAppointments(accessToken).then((res) => {
          expect(Array.isArray(res.result)).toBe(true);
          expect(res.status).toEqual(200);
        });
      });
      
    });
    describe("GET /api/doctor/getFutureAppointments", () => {
        it("Debería retornar el status 200 y el resultado debe ser un arreglo", async () => {
            GetFutureAppointments(accessToken).then((res) => {
              expect(Array.isArray(res.result)).toBe(true);
              expect(res.status).toEqual(200);
            });
          });
      });
  });