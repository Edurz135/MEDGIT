const Router = require("express");
const multer = require("multer");
const { authenticateToken } = require("../middlewares/auth.middleware");
const {
  UploadAppointmentData,
} = require("../controllers/administrator.controller");

const administratorRouter = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// const upload = multer({ dest: "src/uploads/" });
administratorRouter.post(
  "/api/uploadAppointmentData",
  upload.single("file"),
  UploadAppointmentData
);

module.exports = administratorRouter;
