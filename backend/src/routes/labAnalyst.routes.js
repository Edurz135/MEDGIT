const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");

const labAnalystRouter = Router();

labAnalystRouter.post("/api/labAnalyst/pastGetExam", authenticateToken, async (req, res) => {
    console.log(req)
  res.status(200).send("Funciona la validacion con token");
});

module.exports = labAnalystRouter;