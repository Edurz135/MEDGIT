const fs = require("fs");
const { parse } = require("csv-parse");
const { getPatientsService } = require("../service/patient.service");
const { ArrayArrToObjectArr } = require("../utils/arrayArr-to-objectArr");
const { getDoctorsService } = require("../service/doctor.service");
const {
  registerMultipleAppointment,
} = require("../service/appointment.service");
const { formatDate } = require("../utils/format-date");

const UploadAppointmentData = async (req, res) => {
  const filePath = req.file.path;

  const results = [];
  fs.createReadStream(filePath)
    .pipe(parse())
    .on("data", (data) => results.push(data))
    .on("error", (error) => {
      console.error(error);
      return res.status(500).json({ message: "Error processing CSV file" });
    })
    .on("end", async () => {
      // Delete the file after processing
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
      let toReturn = ArrayArrToObjectArr(results);
      let patientDnis = Array.from(new Set(toReturn.map((a) => a.PatientDni)));
      let doctorDnis = Array.from(new Set(toReturn.map((a) => a.DoctorDni)));
      
      let patientData = await getPatientsService(patientDnis);
      let doctorData = await getDoctorsService(doctorDnis);
      
      toReturn = toReturn.map((item) => ({
        ...item,
        PatientId: patientData.find(
          (a) => a.dataValues.identityDoc == item.PatientDni
          ).id,
        DoctorId: doctorData.find(
          (a) => a.dataValues.identityDoc == item.DoctorDni
          ).id,
        }));
        
        let bulkInsertData = toReturn.map((item) => {
          const { PatientDni, DoctorDni, ...rest } = item;
          return {
            ...rest,
            startDate: formatDate(rest.startDate),
            endDate: formatDate(rest.endDate),
          };
        });

      let bulkInsert = await registerMultipleAppointment(bulkInsertData);

      res
        .status(200)
        .json({ message: "CSV file processed successfully", data: toReturn });
    });
};

module.exports = {
  UploadAppointmentData,
};
