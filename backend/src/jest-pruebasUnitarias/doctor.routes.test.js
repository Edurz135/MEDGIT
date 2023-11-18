const request = require('supertest');
const express = require('express');
const doctorRouter = require('../routes/doctor.routes');
const { authenticateToken } = require("../middlewares/auth.middleware");
require("dotenv").config();
const app = express();
const axios = require('axios');
app.use(express.json());
app.use('/api/doctor/', authenticateToken, doctorRouter);
let token;
let data = { email: 'Carlos@gmail.com', password: '123456' };
// Inicia la sesión del doctor
beforeAll(async () => {
  const res = await request(app)
    .post('/api/doctor/loginDoctor')
    .send(data);

  token = res.body.token;
});
console.log(token)
// Agrupa las pruebas unitarias de getPastAppointments
describe('GET /api/doctor/getPastAppointments', () => {
  it('Debería retornar el status 200', async () => {
    axios.get('http://localhost:3100/api/doctor/getPastAppointments', data,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(function (response) {
      //console.log(response.status);
    })
    /* const res = await request(app)
      .get('/api/doctor/getPastAppointments')
      .set('Authorization', `${token}`)	
      .set('Accept', 'application/json')
      .send();

    
    expect(res.statusCode).toEqual(200); */
  });

  // Aquí puedes agregar más pruebas, por ejemplo, verificar que la respuesta tenga el formato correcto
});
