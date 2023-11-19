const express = require("express");
const serverConfig = require("./config/server-config");
const userRouter = require("./routes/user.routes");
const patientRouter = require("./routes/patient.routes");
const doctorRouter = require("./routes/doctor.routes");
const labAnalystRouter = require("./routes/labAnalyst.routes");
//Para cargar las tablas
const { routesAllergy } = require("./LoadData/allergy.load");
const { routesAppointment } = require("./LoadData/appointment.load");
const { routesContenMedAle } = require("./LoadData/contenMedAle.load");
const { routesContenMedCi } = require("./LoadData/contenMedCi.load");
const { routesContenPacAle } = require("./LoadData/contenPacAle.load");
const { routesDoctor } = require("./LoadData/doctor.load");
const { routesExaMed } = require("./LoadData/examedico.load");
const { routesLabAnalyst } = require("./LoadData/labAnalyst.load");
const { routesMedicine } = require("./LoadData/medicine.load");
const { routesPatient } = require("./LoadData/patient.load");
const { routesTipExMed } = require("./LoadData/tipoexamed.load");
const loadData = require("./dbbToProve/loadData");
const {
  executeWeeklyTransactionIfNeeded,
} = require("./stored_procedures/weeklyTransactions");

const server = () => {
  const app = express();

  app.use(serverConfig);
  app.use(userRouter);
  app.use(doctorRouter);
  app.use(labAnalystRouter);
  app.use(patientRouter);
  //Generador de tabla
  app.use(routesAllergy);
  app.use(routesAppointment);
  app.use(routesContenMedAle);
  app.use(routesContenMedCi);
  app.use(routesContenPacAle);
  app.use(routesDoctor);
  app.use(routesExaMed);
  app.use(routesLabAnalyst);
  app.use(routesMedicine);
  app.use(routesPatient);
  app.use(routesTipExMed);

  const run = (port) => {
    app.listen(port);
  };

  const { db } = require("./db");
  const create_update_appointsments_pending_status = require("./stored_procedures/sp_update_appointments_pending_status.js");

  db.sequelize
    .sync({ force: true })
    .then(() => {
      //create_update_appointsments_pending_status(); // Crea el procedimiento almacenado
      db.sequelize
        .query("CALL sp_update_appointments_pending_status();") //Cambia las citas futuras a pasadas
        .then(() => {
          console.log("Procedimiento almacenado ejecutado correctamente");
        })
        .catch((err) => {
          console.log(
            "Error al ejecutar el procedimiento almacenado: " + err.message
          );
        });
      loadData().then(() => {
      executeWeeklyTransactionIfNeeded();
      });
      console.log("DB Synced and Updated.");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });

  return {
    app,
    run,
  };
};

module.exports = server;
