const Router = require("express");
const multer = require('multer');
const { authenticateToken } = require("../middlewares/auth.middleware");
const { UploadAppointmentData } = require("../controllers/administrator.controller");

const administratorRouter = Router();
const upload = multer({ dest: 'uploads/' });

administratorRouter.post('api/uploadAppointmentData', authenticateToken, upload.single('file'), UploadAppointmentData );

module.exports = administratorRouter;
