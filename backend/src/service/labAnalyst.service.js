const { Models } = require("../db.js");
const getUpdatelabAnalystService = async (LabAnalystId, email, password, phone) =>{
    try{
      const labAnalyst = await Models.LabAnalyst.findOne({
        where: {
          id: LabAnalystId,
        },
      });
      await labAnalyst.update({
        email:email,
        password:password,
        phone:phone,
        });
      return labAnalyst;
      }catch (error) {
      throw new Error(error.message);
    }
  };
const getVisualiseLabAnalystService = async (LabAnalystId) => {
  try {
    const labAnalyst = await Models.LabAnalyst.findOne({
      attributes: ["name", "lastName","email","password", "identityDoc","nroColegiatura","gender","phone"],
      where: {
        id: LabAnalystId,
      },
    });
    return labAnalyst;
  } catch (e) {
    throw new Error(e.message);
  }
  };
module.exports={
    getUpdatelabAnalystService,
    getVisualiseLabAnalystService,
};