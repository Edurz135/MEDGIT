const { db } = require("../db");
// Actualiza si una fecha de cita es futura o pasada
// Exists es para comprobar si existe un registro en la tabla o no
// 1 es un placeholder

const create_update_appointsments_pending_status =()=>{
  console.log("Connection to database has been established successfully.");
  console.log("Creating stored procedure...");
  db.sequelize
  .query(`
  CREATE PROCEDURE sp_update_appointments_pending_status(
  )
  LANGUAGE plpgsql
  AS
  $$
  BEGIN
    UPDATE public."Appointments"
      SET pending = false
      WHERE "endDate" < now();
    
  END;
  $$;
`)
  .then(() => {
    console.log("Stored procedure created successfully.");
  })
  .catch((err) => {
    console.error("Error creating stored procedure:", err);
  });
};

module.exports = create_update_appointsments_pending_status;
