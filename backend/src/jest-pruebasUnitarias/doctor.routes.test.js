require("dotenv").config();
//const app = express();
const axios = require('axios');

let token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkNhcmxvcyIsImxhc3ROYW1lIjoiUXVpc3BlIiwiZW1haWwiOiJDYXJsb3NAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkUTZTdTdxM2wwMjVLbW9ZLktuUk5xZW40ckIvdVUyUUtlZmN1Q09jUVdvamdEODVwWHNORlMiLCJpZGVudGl0eURvYyI6MTIzNDU2NzgsIm5yb0NvbGVnaWF0dXJhIjpudWxsLCJnZW5kZXIiOiJNYXNjdWxpbm8iLCJwaG9uZSI6OTk5OTk5OTk5LCJtb25kYXlEaXNwb25pYmlsaXR5IjoiMDAxMTEwMTEwMDAwIiwidHVlc2RheURpc3BvbmliaWxpdHkiOiIwMDExMTAxMTAwMDAiLCJ3ZWRuZXNkYXlEaXNwb25pYmlsaXR5IjoiMDAxMTEwMTEwMDAwIiwidGh1cnNkYXlEaXNwb25pYmlsaXR5IjoiMDAxMTEwMTEwMDAwIiwiZnJpZGF5RGlzcG9uaWJpbGl0eSI6IjAwMTExMDExMDAwMCIsInNhdHVyZGF5RGlzcG9uaWJpbGl0eSI6IjAwMTExMDAwMDAwMCIsInN1bmRheURpc3BvbmliaWxpdHkiOiIwMDExMTAwMDAwMDAiLCJjcmVhdGVkQXQiOiIyMDIzLTExLTA5VDIyOjM4OjI0LjQ3MFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTA5VDIyOjM4OjI0LjQ3MFoiLCJTcGVjaWFsdHlJZCI6MH0.ptAzBaC_yPK5w4MoESxxRar55-3JtZCO78ikg1BolvQ";

let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "http://localhost:3100/api/doctor/getPastAppointments",
  headers: {
    Authorization: token,
  },
};
//console.log(token);
// Agrupa las pruebas unitarias de getPastAppointments
describe('GET /api/doctor/getPastAppointments', () => {
  it('Debería retornar el status 200', async () => {
    try {
      const resp = await axios.request(config);
      console.log(resp.data);
      expect(resp.status).toEqual(200);
    } catch (error) {
      console.log(error);
    }
  });
})
