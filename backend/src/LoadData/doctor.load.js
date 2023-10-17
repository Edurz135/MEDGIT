const { Models } = require("../db.js");
const { faker } = require('@faker-js/faker');
const routesDoctor = require("express").Router();

routesDoctor.get("/doctor", async (req, res) => {
    try {
        const result = await Models.Doctor.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Doctors Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesDoctor.get("/doctor/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Models.Doctor.findOne({
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
routesDoctor.post("/doctor", async (req, res) => {

    try {
        await Models.Doctor.sync()
        const result = await Models.Doctor.create({
            name: faker.internet.userName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            identityDoc: 3456789,
            nroColegiatura:5647,
            gender: faker.person.gender(),
            phone: 889976434,
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
routesDoctor.put("/doctor/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataDoctor = req.body;
        await Models.Doctor.sync()
        const result = await Models.Doctor.update({
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
routesDoctor.delete("/doctor/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Models.Doctor.destroy({
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
module.exports={routesDoctor};