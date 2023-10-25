const {db} = require("../db.js");
// Actualiza si una fecha de cita es futura o pasada
// Exists es para comprobar si existe un registro en la tabla o no
// 1 es un placeholder
db.createStoredProcedure("sp_update_future_to_past_appointments", `
  CREATE PROCEDURE sp_update_future_to_past_appointments(
  )
  LANGUAGE plpgsql
  AS
  $$
  BEGIN
    UPDATE ExaMeds
      SET state = true
      WHERE EXISTS (
        SELECT 1
        FROM Appointments
        WHERE Appointments.id = ExaMeds.appointmentId
        AND Appointments.date >= now()
      );
  END;
  $$;
`, {
  deterministic: true,
});
module.exports = {
    db,
  };