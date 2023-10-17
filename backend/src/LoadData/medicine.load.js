const { Models } = require("../db.js");
const { faker } = require('@faker-js/faker');
const routesMedicine = require("express").Router();

routesMedicine.get("/medicine", async (req, res) => {
    try {
        const result = await Models.Medicine.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Medicines Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesMedicine.get("/medicine/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Models.Medicine.findOne({
            where: {
                id,
            }
        });
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Medicine Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesMedicine.post("/medicine", async (req, res) => {

    try {
        await Models.Medicine.sync()
        const result = await Models.Medicine.create({
            name: faker.commerce.productName(),
            dose: faker.commerce.price(),
            instruction: faker.commerce.productMaterial(),
            description: faker.commerce.productDescription(),
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Medicine Created"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})
routesMedicine.put("/medicine/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataMedicine = req.body;
        await Medicine.sync()
        const result = await Models.Medicine.update({
            name: dataMedicine.name,
            dose: dataMedicine.dose,
            instruction: dataMedicine.instruction,
            description: dataMedicine.description,
        },{
            where:{
                id,
            }
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Medicine Update"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesMedicine.delete("/medicine/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Models.Medicine.destroy({
            where:{
                id,
            }
        })
        res.status(204).json({
            status: 204,
            result: result,
            message: "Succesfully Medicine Delete"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
module.exports={routesMedicine};