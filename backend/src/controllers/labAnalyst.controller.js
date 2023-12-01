const{
  getUpdatelabAnalystService,
  getVisualiseLabAnalystService,
  updateExaMedService,
  getPendingExaMedsService,
} = require("../service/labAnalyst.service.js")
const getPendingExaMeds = async (req, res) => {
  try {
    const result = await getPendingExaMedsService(req.user.id) || [];
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully MedExam Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

const getupdatelabAnalyst = async (req, res) => {
  try {
    const result = await getUpdatelabAnalystService(req.body, req.user.id);
    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully LabAnalyst Update",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
const getVisualiseLabAnalyst = async (req, res) => {
  try {
    const result = await getVisualiseLabAnalystService(req.user.id) || [];

    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully LabAnalyst Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
const updateExaMed = async (req, res) => {
  try {
    
    const result = (await updateExaMedService(req.body.data)) || [];

    return res.status(200).json({
      status: 200,
      result: result,
      message: "Succesfully Med Exam Returned",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
module.exports={
  getupdatelabAnalyst,
  getVisualiseLabAnalyst,
  getPendingExaMeds,
  updateExaMed
};
