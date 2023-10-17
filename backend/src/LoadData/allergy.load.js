const { Models } = require("../db.js");
const { faker } = require('@faker-js/faker');
const routesAllergy = require("express").Router();

routesAllergy.get("/allergy", async (req, res) => {
    try {
        const getAllergys = await Models.Allergy.findAll();
        res.status(200).json({
            status: 200,
            result: getAllergys,
            message: "Succesfully Allergys Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesAllergy.get("/allergy/:id", async (req, res) => {
    
    try {
        const id = req.params.id;
        const getAllergy = await Models.Allergy.findOne({
            where: {
                id,
            }
        });
        res.status(200).json({
            status: 200,
            result: getAllergy,
            message: "Succesfully Allergy Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesAllergy.post("/allergy", async (req, res) => {
    try {
        await Models.Allergy.sync()
        const postAllergy = await Models.Allergy.create({
            name: faker.commerce.productName(),
            sick: faker.person.fullName(),
                
        })
        res.status(200).json({
            status: 200,
            result: postAllergy,
            message: "Succesfully Allergy Created"
        })
    } catch (e) {
        
        return res.status(400).json({ status: 400, message: e.message});
    }
})
routesAllergy.put("/allergy/:id", async(req, res) =>{
    console.log("========================")
    console.log(req.params);
    console.log("========================")
    try{
        const id = req.params.id;
        const dataAllergy = req.body;
        await Models.Allergy.sync();
        const putAllergy = await Models.Allergy.update({
            name: dataAllergy.name,
            sick: dataAllergy.sick,
        },{
            where:{
                id:id,
            }
        })
        res.status(200).json({
            status: 200,
            result: putAllergy,
            message: "Succesfully LabAnalyst Update"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesAllergy.delete("/allergy/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const deleteAllergy = await Models.Allergy.destroy({
            where:{
                id,
            }
        })
        res.status(204).json({
            status: 204,
            result: deleteAllergy,
            message: "Succesfully Allergy Delete"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
module.exports={routesAllergy};