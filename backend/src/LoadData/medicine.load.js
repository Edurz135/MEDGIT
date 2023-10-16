const Medicine = require("../models/medicine.model");
const { faker } = require('@faker-js/faker');
const routes = require("express").routes();

routes.get("/medicine", async (req, res) => {
    try {
        const result = await Medicine.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Medicines Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.get("/medicine/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Medicine.findOne({
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
routes.post("/medicine", async (req, res) => {

    try {
        await Medicine.sync()
        const result = await Medicine.create({
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
routes.put("/medicine/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataMedicine = req.body;
        await Medicine.sync()
        const result = await Medicine.update({
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
routes.delete("/medicine/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Medicine.destroy({
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