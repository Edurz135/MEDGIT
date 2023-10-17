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
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ContenMedAle Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});

routesContenMedAle.put("/contenMedAle/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataContenMedAle = req.body;
        await Models.LabAnalyst.sync()
        const result = await Models.ContenMedAle.update({
            DoctorId: dataContenMedAle.ExaMedId,
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