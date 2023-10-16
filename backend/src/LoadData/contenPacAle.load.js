const ContenPacAle = require("../models/contenPacAle.model");
const { faker } = require('@faker-js/faker');
const routes = require("express").routes();

routes.get("/contenPacAle", async (req, res) => {
    try {
        const result = await ContenPacAle.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ContenPacAles Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.get("/contenPacAle/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ContenPacAle.findOne({
            where: {
                id,
            }
        });
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ContenPacAle Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});

routes.put("/contenPacAle/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataContenPacAle = req.body;
        await ContenPacAle.sync()
        const result = await ContenPacAle.update({
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
routes.delete("/contenPacAle/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await ContenPacAle.destroy({
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