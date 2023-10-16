const LabAnalyst = require("../models/tipoexamed.model");
const { faker } = require('@faker-js/faker');
const routes = require("express").routes();

routes.get("/tipoexamed", async (req, res) => {
    try {
        const result = await TipExMed.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully TipExMeds Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.get("/tipoexamed/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await TipExMed.findOne({
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
routes.post("/tipoexamed", async (req, res) => {

    try {
        await TipExMed.sync()
        const result = await TipExMed.create({
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
routes.put("/tipoexamed/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataTipExMed = req.body;
        await TipExMed.sync()
        const result = await TipExMed.update({
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
routes.delete("/tipoexamed/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await TipExMed.destroy({
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