const { Models } = require("../db.js");
const routesContenPacAle = require("express").Router();

routesContenPacAle.get("/contenPacAle", async (req, res) => {
    try {
        const result = await Models.ContenPacAle.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ContenPacAles Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesContenPacAle.get("/contenPacAle/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Models.ContenPacAle.findOne({
            where: {
                id,
            }
        });
        const idAllergy = result.AllergyId;
        const allergy = await Models.Allergy.findOne({
            where: {
                id:idAllergy,
            }
        });
        const idPatient = result.PatientId;
        const patient = await Models.Patient.findOne({
            where: {
                id:idPatient,
            }
        });
        const resultado = {}
        resultado["createdAt"] = result.createdAt
        resultado["updatedAt"] = result.updatedAt
        resultado["allergy"] = allergy
        resultado["patient"] = patient
        res.status(200).json({
            status: 200,
            result: resultado,
            message: "Succesfully ContenPacAle Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesContenPacAle.post("/contenPacAle", async (req, res) => {

    try {
        await Models.ContenPacAle.sync()
        const result = await Models.ContenPacAle.create({

        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully contenPacAle Created"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})
routesContenPacAle.put("/contenPacAle/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataContenPacAle = req.body;
        await Models.ContenPacAle.sync()
        const result = await Models.ContenPacAle.update({
            AllergyId: dataContenPacAle.AllergyId,
            PatientId: dataContenPacAle.PatientId,
        },{
            where:{
                id,
            }
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully LabAnalyst Update"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesContenPacAle.delete("/contenPacAle/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Models.ContenPacAle.destroy({
            where:{
                id,
            }
        })
        res.status(204).json({
            status: 204,
            result: result,
            message: "Succesfully ContenPacAle Delete"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
module.exports={routesContenPacAle};