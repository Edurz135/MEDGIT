const getPastAppointments = async (req, res) => {
    try {
        const result = await getPastAppointmentsService(req.body);
        return res.status(200).json({
          status: 200,
          result: result,
          message: "Succesfully Appointsments Returned",
        });
      } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
      } 
}

const getFutureAppointments = async (req, res) => {
  try {
      const result = await getFutureAppointmentsService(req.body);
      return res.status(200).json({
        status: 200,
        result: result,
        message: "Succesfully Appointsments Returned",
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    } 
}