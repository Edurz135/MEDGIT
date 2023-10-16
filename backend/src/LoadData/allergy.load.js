const Allergy = require("../models/allergy.model");
const { faker } = require('@faker-js/faker');
const routes = require("express").routes();

routes.get("/allergy", async (req, res) => {
    try {
        const result = await Allergy.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Allergys Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.get("/allergy/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Allergy.findOne({
            where: {
                id,
            }
        });
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Allergy Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.post("/allergy", async (req, res) => {

    try {
        await Allergy.sync()
        const result = await Allergy.create({
            name: faker.commerce.productName(),
            sick: faker.person.fullName(),
                
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Allergy Created"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})
routes.put("/allergy/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataAllergy = req.body;
        await Allergy.sync()
        const result = await Allergy.update({
            name: dataAllergy.name,
            sick: dataAllergy.sick,
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
routes.delete("/allergy/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Allergy.destroy({
            where:{
                id,
            }
        })
        res.status(204).json({
            status: 204,
            result: result,
            message: "Succesfully Allergy Delete"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});