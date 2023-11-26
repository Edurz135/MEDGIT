// En tu archivo de rutas (por ejemplo, appointment.routes.js)
router.put('/appointment/:id', appointmentController.updateAppointment);

// En tu archivo de controladores (por ejemplo, appointment.controller.js)
exports.updateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { diagnostic } = req.body;
    // Actualizar la cita en la base de datos
    // ...
    return res.status(200).json({ message: 'Cita actualizada con éxito' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar la cita' });
  }
};
