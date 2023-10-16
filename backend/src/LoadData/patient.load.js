const Patient = require("../models/patient.model");
const { faker } = require('@faker-js/faker');
const routes = require("express").Router();

routes.get("/patient", async (req, res) => {
    try {
        const result = await Patient.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Patients Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.get("/patient/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Patient.findOne({
            where: {
                id,
            }
        });
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Patient Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.post("/patient", async (req, res) => {

    try {
        await Patient.sync()
        const result = await Patient.create({
            name: faker.internet.userName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            identityDoc: faker.number({ min: 10000000000, max: 99999999999}),
            gender: faker.person.gender(),
            phone: faker.phone.number(),
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Patient Created"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})
routes.put("/patient/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataPatient = req.body;
        await Patient.sync()
        const result = await Patient.update({
            name: dataPatient.name,
            lastName: dataPatient.lastName,
            email: dataPatient.email,
            password: dataPatient.password,
            identityDoc: dataPatient.identityDoc,
            gender: dataPatient.gender,
            phone: dataPatient.phone,
            AllergyId: dataPatient.AllergyId,
        },{
            where:{
                id,
            }
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Patient Update"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.delete("/patient/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Patient.destroy({
            where:{
                id,
            }
        })
        res.status(204).json({
            status: 204,
            result: result,
            message: "Succesfully Patient Delete"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
module.exports={routes};
