const LabAnalyst = require("../models/labAnalyst.model");
const { faker } = require('@faker-js/faker');
const routes = require("express").routes();

routes.get("/labAnalyst", async (req, res) => {
    try {
        const result = await LabAnalyst.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully LabAnalysts Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.get("/labAnalyst/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await LabAnalyst.findOne({
            where: {
                id,
            }
        });
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully LabAnalyst Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.post("/labAnalyst", async (req, res) => {

    try {
        await LabAnalyst.sync()
        const result = await LabAnalyst.create({
            name: faker.internet.userName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            identityDoc: faker.number({ min: 100000000, max: 999999999 }),
            nroColegiatura:faker.number({ min: 10000000000, max: 99999999999 }),
            gender: faker.person.gender(),
            phone: faker.phone.number(),
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully LabAnalyst Created"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})
routes.put("/labAnalyst/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataLabAnalyst = req.body;
        await LabAnalyst.sync()
        const result = await LabAnalyst.update({
            name: dataLabAnalyst.name,
            lastName: dataLabAnalyst.lastName,
            email: dataLabAnalyst.email,
            password: dataLabAnalyst.password,
            identityDoc: dataLabAnalyst.identityDoc,
            nroColegiatura: dataLabAnalyst.nroColegiatura,
            gender: dataLabAnalyst.gender,
            phone: dataLabAnalyst.phone,
            ExaMedId: dataLabAnalyst.ExaMedId
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
routes.delete("/labAnalyst/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await LabAnalyst.destroy({
            where:{
                id,
            }
        })
        res.status(204).json({
            status: 204,
            result: result,
            message: "Succesfully LabAnalyst Delete"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});