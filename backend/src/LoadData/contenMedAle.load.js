const { Models } = require("../db.js");
const routesContenMedAle = require("express").Router();

routesContenMedAle.get("/contenMedAle", async (req, res) => {
    try {
        const result = await Models.ContenMedAle.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ContenMedAles Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesContenMedAle.get("/contenMedAle/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Models.ContenMedAle.findOne({
            where: {
                id,
            }
        });
        const idDoctor = result.DoctorId;
        const doctor = await Models.Doctor.findOne({
            where: {
                id:idDoctor,
            }
        });
        const idAllergy = result.AllergyId;
        const allergy = await Models.Allergy.findOne({
            where: {
                id:idAllergy,
            }
        });
        const resultado = {}
        resultado["createdAt"] = result.createdAt
        resultado["updatedAt"] = result.updatedAt
        resultado["DoctorId"]= doctor
        resultado["AllergyId"]= allergy
        res.status(200).json({
            status: 200,
            result: resultado,
            message: "Succesfully ContenMedAle Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesContenMedAle.post("/contenMedAle", async (req, res) => {

    try {
        await Models.ContenMedAle.sync()
        const result = await Models.ContenMedAle.create({

        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully contenMedAle Created"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})
routesContenMedAle.put("/contenMedAle/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataContenMedAle = req.body;
        await Models.LabAnalyst.sync()
        const result = await Models.ContenMedAle.update({
            DoctorId: dataContenMedAle.DoctorId,
            AllergyId: dataContenMedAle.AllergyId,
        },{
            where:{
                id,
            }
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ContenMedAle Update"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesContenMedAle.delete("/contenMedAle/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Models.ContenMedAle.destroy({
            where:{
                id,
            }
        })
        res.status(204).json({
            status: 204,
            result: result,
            message: "Succesfully ContenMedAle Delete"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
module.exports={routesContenMedAle};