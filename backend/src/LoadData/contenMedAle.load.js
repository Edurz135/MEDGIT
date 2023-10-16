const ContenMedAle = require("../models/contenMedAle.model");
const { faker } = require('@faker-js/faker');
const routes = require("express").routes();

routes.get("/contenMedAle", async (req, res) => {
    try {
        const result = await ContenMedAle.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ContenMedAles Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.get("/contenMedAle/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ContenMedAle.findOne({
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

routes.put("/contenMedAle/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataContenMedAle = req.body;
        await LabAnalyst.sync()
        const result = await ContenMedAle.update({
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
routes.delete("/contenMedAle/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await ContenMedAle.destroy({
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