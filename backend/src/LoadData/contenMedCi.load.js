const ContenMedCi = require("../models/contenMedCi.model");
const { faker } = require('@faker-js/faker');
const routes = require("express").routes();

routes.get("/contenMedCi", async (req, res) => {
    try {
        const result = await ContenMedCi.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ContenMedCis Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.get("/contenMedCi/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ContenMedCi.findOne({
            where: {
                id,
            }
        });
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ContenMedCi Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});

routes.put("/contenMedCi/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataContenMedCi = req.body;
        await ContenMedCi.sync()
        const result = await ContenMedCi.update({
            ExaMedId: dataContenMedCi.ExaMedId
        },{
            where:{
                id,
            }
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ContenMedCi Update"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.delete("/contenMedCi/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await ContenMedCi.destroy({
            where:{
                id,
            }
        })
        res.status(204).json({
            status: 204,
            result: result,
            message: "Succesfully ContenMedCi Delete"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});