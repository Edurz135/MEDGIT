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
            pending: true,
            state: 2,
          },
        }
      ],
    });
    return ExaMeds;
  } catch (e) {
    throw new Error(e.message);
  }
}
const updateAppointmentService = async (body) => {
  try {
    console.log(body);
    const appointment = await Models.Appointment.findOne({
      where: {
        id: body.appointmentId,
      },
    });

    await appointment.update({
      pending: false,
      diagnostic: body.diagnostico,
      tipExMeds: body.examenesLab,
    });

    console.log(appointment);
    if(body.receta != []) {
      body.receta.map(async (receta) => {
        await Models.Medicine.create(receta).then(async (nuevaMedicina) => {
          const idNuevaMedicina = nuevaMedicina.dataValues.id;
          await Models.ContenMedCi.create({
            AppointmentId: body.appointmentId,
            MedicineId: idNuevaMedicina,
          });
        });
      })
    }

    if (body.examenesLab != []) {
      body.examenesLab.map(async (examenMedico) => {
        await Models.ExaMed.create({
          state: 0,
          comment: "",
          AppointmentId: body.appointmentId,
          TipExMedId: examenMedico.value,
        });
      });
    }

    result = appointment;
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};
module.exports={
    getPendingExaMedsService,
    getUpdatelabAnalystService,
    getVisualiseLabAnalystService,
};
