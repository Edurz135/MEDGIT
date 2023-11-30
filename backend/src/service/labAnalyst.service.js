const { Models } = require("../db.js");
const bcrypt = require("bcrypt");

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
    let tipExMedIds= getLabAnalystTipExMedSupport(LabAnalystId);
    const ExaMeds = await Models.ExaMed.findAll({
      attributes: ["id", "comment"],
      where: {
        state: 0,
      },
      include:[
        {
          model: Models.TipExMed,
          where: {
            
            id:{
              [Op.or]:tipExMedIds,
            }
          },
          attributes: ["name"],
        }
      ],
      include:[
        {
          model: Models.Appointment,
          where: {
            pending: true,
            state: 2,
          },
        }
      ]
    });
    return ExaMeds;
  } catch (e) {
    throw new Error(e.message);
  }
}
module.exports={
    getPendingExaMedsService,
    getUpdatelabAnalystService,
    getVisualiseLabAnalystService,
};
