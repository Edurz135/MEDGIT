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
module.exports={
    getUpdatelabAnalystService,
};