const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");

const {
    getupdatelabAnalyst,
} = require("../controllers/labAnalyst.controller");
const labAnalystRouter = Router();

// labAnalystRouter.post("/api/labAnalyst/pastGetExam",)

labAnalystRouter.put(
    "/api/labAnalyst/updateGetlabAnalyst",
    authenticateToken,
    getupdatelabAnalyst
  )
module.exports = labAnalystRouter;