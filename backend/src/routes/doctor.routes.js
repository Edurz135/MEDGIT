const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");

const doctorRouter = Router();

doctorRouter.post("/api/doctor/prueba", authenticateToken, async (req, res) => {
    console.log(req)
  res.status(200).send("Funcina la validacion con token");
});

module.exports = doctorRouter;
