const { Models } = require("../db.js");
const { faker } = require('@faker-js/faker');
const routesTipExMed = require("express").Router();

routesTipExMed.get("/tipoexamed", async (req, res) => {
    try {
        const result = await Models.TipExMed.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully TipExMeds Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesTipExMed.get("/tipoexamed/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Models.TipExMed.findOne({
            where: {
                id,
            }
        });
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully TipExMed Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesTipExMed.post("/tipoexamed", async (req, res) => {

    try {
        await TipExMed.sync()
        const result = await Models.TipExMed.create({
            name: faker.company.name(),
            
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully TipExMed Created"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})
routesTipExMed.put("/tipoexamed/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataTipExMed = req.body;
        await Models.TipExMed.sync()
        const result = await Models.TipExMed.update({
            name: dataTipExMed.name,
        },{
            where:{
                id,
            }
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully TipExMed Update"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesTipExMed.delete("/tipoexamed/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Models.TipExMed.destroy({
            where:{
                id,
            }
        })
        res.status(204).json({
            status: 204,
            result: result,
            message: "Succesfully TipExMed Delete"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
module.exports={routesTipExMed};