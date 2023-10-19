const { Models } = require("../db.js");
const { faker } = require('@faker-js/faker');
const routesPatient = require("express").Router();

routesPatient.get("/patient", async (req, res) => {
    try {
        const result = await Models.Patient.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Patients Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesPatient.get("/patient/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Models.Patient.findOne({
            where: {
                id,
            }
        });
        const idAllergy = result.AllergyId;
        const allergy = await Models.Allergy.findOne({
            where: {
                id:idAllergy,
            }
        });

        const resultado = {}
        resultado["name"] = result.name
        resultado["lastName"] = result.lastName
        resultado["email"] = result.email
        resultado["password"] = result.password
        resultado["identityDoc"] = result.identityDoc
        resultado["gender"] = result.gender
        resultado["phone"] = result.phone
        resultado["createdAt"] = result.createdAt
        resultado["updatedAt"] = result.updatedAt
        resultado["allergy"] = allergy
        console.log(result);
        res.status(200).json({
            status: 200,
            result: resultado, 
            message: "Succesfully Patient Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesPatient.post("/patient", async (req, res) => {
    console.log(faker.phone.number());
    try {
        await Models.Patient.sync()
        const result = await Models.Patient.create({
            name: faker.internet.userName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            identityDoc: 351651516,
            gender: faker.person.gender(),
            phone: 7777777,
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
routesPatient.put("/patient/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataPatient = req.body;
        await Models.Patient.sync()
        const result = await Models.Patient.update({
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
routesPatient.delete("/patient/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Models.Patient.destroy({
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
module.exports={routesPatient};