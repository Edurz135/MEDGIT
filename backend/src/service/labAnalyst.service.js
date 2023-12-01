const { Models } = require("../db.js");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const getUpdatelabAnalystService = async (body, LabAnalystId) =>{
    try{
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const labAnalyst = await Models.LabAnalyst.findOne({
        where: {
          id: LabAnalystId,
        },
      });
      await labAnalyst.update({
        email:body.email,
        password:hashedPassword,
        phone:body.phone,
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
const getLabAnalystTipExMedSupport = async (LabAnalystId) => {
  try{
    const tipExMedIds = await Models.TipExMedLabAnalyst.findall({
      attributes: ["tipExMedId"],
      where: {
        LabAnalystId: LabAnalystId,
      },
    });
    return tipExMedIds;
  } catch (e) {
    throw new Error(e.message);
  }

}
// Pide el examen medico que no está hecho
const getPendingExaMedsService = async (LabAnalystId) => {
  try {
    let tipExMedIds= getLabAnalystTipExMedSupport
    let tipExMedIdsArray = Object.keys(tipExMedIds).map(id => parseInt(id));(LabAnalystId);
    const ExaMeds = await Models.ExaMed.findAll({
      attributes: ["id", "comment"],
      where: {
        state: 0,
      },
      include:[
        {
          model: Models.TipExMed,
          attributes: ["name"],
          where: {
            id:{
              [Op.or]:tipExMedIdsArray,
            }
          },
          
        },
        {
          model: Models.Appointment,
          attributes: [],
          where: {
            pending: false,
            state: 2,
          },
          include: [
            {
              model: Models.Patient,
              attributes: ["name", "lastName"],
            },
          ],
        }
      ],
    });
    return ExaMeds;
  } catch (e) {
    throw new Error(e.message);
  }
}
const updateExaMedService = async (body) => {
  try {
    console.log(body);
    const exaMed = await Models.ExaMed.findOne({
      where: {
        id: body.ExaMedId,
      },
    });
    if (body.comment === "") {
      throw new Error("Comment is empty");
    }
    await exaMed.update({
      comment: body.comment,
      state: 1,
    });

    console.log(exaMed);
    
    return exaMed;
  } catch (e) {
    throw new Error(e.message);
  }
};
module.exports={
    updateExaMedService,
    getPendingExaMedsService,
    getUpdatelabAnalystService,
    getVisualiseLabAnalystService,
};
