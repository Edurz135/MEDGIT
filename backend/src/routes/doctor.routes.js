const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");

const doctorRouter = Router();

doctorRouter.post("/api/doctor/pastGetAppointment", authenticateToken, async (req, res) => {
    console.log(req)
  res.status(200).send("Funciona la validacion con token");
});
doctorRouter.post("/api/doctor/futureGetAppointment", authenticateToken, async (req, res) => {
  console.log(req)
res.status(200).send("Funciona la validacion con token");
});
module.exports = doctorRouter;
