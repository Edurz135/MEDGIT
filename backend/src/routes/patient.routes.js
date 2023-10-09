const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");

const patientRouter = Router();

patientRouter.post("/api/patient/pastGetExam", authenticateToken, async (req, res) => {
    console.log(req)
  res.status(200).send("Funciona la validacion con token");
});
patientRouter.post("/api/patient/futureGetExam", authenticateToken, async (req, res) => {
  console.log(req)
res.status(200).send("Funciona la validacion con token");
});
module.exports = patientRouter;