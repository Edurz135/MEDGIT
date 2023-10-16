const Doctor = require("../models/doctor.model");
const { faker } = require('@faker-js/faker');
const routes = require("express").routes();

routes.get("/doctor", async (req, res) => {
    try {
        const result = await Doctor.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Doctors Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.get("/doctor/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Doctor.findOne({
            where: {
                id,
            }
        });
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Doctor Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.post("/doctor", async (req, res) => {

    try {
        await Doctor.sync()
        const result = await Doctor.create({
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
            message: "Succesfully Doctor Created"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})
routes.put("/doctor/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataDoctor = req.body;
        await Doctor.sync()
        const result = await Doctor.update({
            name: dataDoctor.name,
            lastName: dataDoctor.lastName,
            email: dataDoctor.email,
            password: dataDoctor.password,
            identityDoc: dataDoctor.identityDoc,
            nroColegiatura: dataDoctor.nroColegiatura,
            gender: dataDoctor.gender,
            phone: dataDoctor.phone,
        },{
            where:{
                id,
            }
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Doctor Update"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.delete("/doctor/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Doctor.destroy({
            where:{
                id,
            }
        })
        res.status(204).json({
            status: 204,
            result: result,
            message: "Succesfully Doctor Delete"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});