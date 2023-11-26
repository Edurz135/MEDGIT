const Router = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");

const {
    getupdatelabAnalyst,
    getVisualiseLabAnalyst,
    getPendingExaMeds,
} = require("../controllers/labAnalyst.controller");
const labAnalystRouter = Router();

// labAnalystRouter.post("/api/labAnalyst/pastGetExam",)

labAnalystRouter.put(
    "/api/labAnalyst/updateGetlabAnalyst",
    authenticateToken,
    getupdatelabAnalyst
  );
labAnalystRouter.get(
  "/api/labAnalyst/getVisualiseLabAnalyst",
  authenticateToken,
  getVisualiseLabAnalyst
);
labAnalystRouter.get(
  "/api/labAnalyst/getPendingExaMeds",
  authenticateToken,
  getPendingExaMeds
);
module.exports = labAnalystRouter;