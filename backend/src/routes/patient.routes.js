const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");

const labAnalystRouter = Router();

labAnalystRouter.post("/api/patient/prueba", authenticateToken, async (req, res) => {
    console.log(req)
  res.status(200).send("Funcina la validacion con token");
});

module.exports = labAnalystRouter;