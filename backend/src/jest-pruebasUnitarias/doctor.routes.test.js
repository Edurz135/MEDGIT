const request = require('supertest');
const express = require('express');
const {doctorRouter} = require('../routes/doctor.routes');
const { authenticateToken } = require("../middlewares/auth.middleware");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use('/api/doctor/', authenticateToken, doctorRouter);

// Inicia la sesión del doctor
beforeAll(async () => {
  const res = await request(app)
    .post('/api/doctor/loginDoctor')
    .send({ email: 'Carlos@gmail.com', password: '123456' });

  token = res.body.token;
});
// Agrupa las pruebas unitarias de getPastAppointments
describe('GET /api/doctor/getPastAppointments', () => {
  it('Debería retornar el status 200', async () => {
    const res = await request(app)
      .get('/api/doctor/getPastAppointments')
      .set('Authorization', `Bearer ${token}`)	
      .send();
    console.log(res.result);
    expect(res.statusCode).toEqual(200);
  });

  // Aquí puedes agregar más pruebas, por ejemplo, verificar que la respuesta tenga el formato correcto
});
