const axios = require("axios");
require("dotenv").config();
const LoginLab = async (LabBody) => {
    const res = await axios.post(
      "http://localhost:3100/api/loginLabAnalyst",
      LabBody
    );
    return res.data;
  };
  const getPendingExaMeds = async (accessToken) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3100/api/labAnalyst/getPendingExaMeds",
      headers: {
        Authorization: accessToken,
      },
    };
  
    const res = await axios.request(config);
    return res.data;
  };
    const postUpdateExaMed = async (accessToken, body) => {
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:3100/api/labAnalyst/updateExaMed",
            headers: {
            Authorization: accessToken,
            },
            data: body,
        };
        
        const res = await axios.request(config);
        return res.data;
    }

  describe("########## LAB TESTS", () => {
    var accessToken = "";
    const LabBody = { email: "lab@gmail.com", password: "123456" };
  
    beforeAll(async () => {
     
      await LoginLab(LabBody).then((res) => {
        accessToken = res.accessToken;
      });
    });
  
    describe("GET /api/labAnalyst/getPendingExaMeds", () => {
      it("Debería retornar el status 200 y el resultado debe ser un arreglo", async () => {
        getPendingExaMeds(accessToken).then((res) => {
          expect(Array.isArray(res.result)).toBe(true);
          expect(res.status).toEqual(200);
        });
      });
      
    });
    describe("POST /api/labAnalyst/updateExaMed", () => {
        it("Debería retornar el status 200 y el resultado debe ser un arreglo", async () => {
            const body={
                "data":{
                  "ExaMedId":1,
                "comment": "Test-Jest"
                }
              }
            postUpdateExaMed(accessToken,body).then((res) => {
            expect(Array.isArray(res.result)).toBe(true);
            expect(res.status).toEqual(200);
          });
        });
      });
  });
  