const Patient = require("../models/patient.model");
const { faker } = require('@faker-js/faker');
const routes = require("express").routes();

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
            email: faker.internet.email(),
            password: faker.internet.password(),
        })
        res.status(201).json({
            status: 200,
            result: result,
            message: "Succesfully Patient Created"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})
routes.put("/patient", async(req, res));
routes.delete("/patient", async(req, res));
