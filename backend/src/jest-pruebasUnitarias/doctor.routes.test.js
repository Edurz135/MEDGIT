const request = require('supertest');
const express = require('express');
const doctorRouter = require('../routes/doctor.routes');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../middlewares/auth.middleware');
require("dotenv").config();
const app = express();
const { getDoctorService } = require('../service/user.service');
app.use(express.json());
app.use('/doctor', doctorRouter);
console.log(process.env.TOKEN_SECRET);
// Genera un token de prueba
const testDoctor = { 'email': 'testDoctor@gmail.com' };
console.log(testDoctor);
const token = jwt.sign(testDoctor, process.env.TOKEN_SECRET);

// Agrupa las pruebas unitarias de getPastAppointments
describe('GET /doctor/getPastAppointments', () => {
  it('Debería retornar el status 200', async () => {
    const res = await request(app)
      .get('/doctor/getPastAppointments')
      .set('Authorization', `Bearer ${token}`)	
      .send();

    expect(res.statusCode).toEqual(200);
  });

  // Aquí puedes agregar más pruebas, por ejemplo, verificar que la respuesta tenga el formato correcto
});
