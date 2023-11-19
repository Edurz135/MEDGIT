const fs = require('fs');

const UploadAppointmentData = async (req, res) => {
  const filePath = req.file.path;

  const results = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("error", (error) => {
      console.error(error);
      return res.status(500).json({ message: "Error processing CSV file" });
    })
    .on("end", () => {
      // Delete the file after processing
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });

      res
        .status(200)
        .json({ message: "CSV file processed successfully", data: results });
    });
};

module.exports = {
  UploadAppointmentData,
};
