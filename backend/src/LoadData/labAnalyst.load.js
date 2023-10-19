const { Models } = require("../db.js");
const { faker } = require('@faker-js/faker');
const routesLabAnalyst = require("express").Router();

routesLabAnalyst.get("/labAnalyst", async (req, res) => {
    try {
        const result = await Models.LabAnalyst.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully LabAnalysts Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesLabAnalyst.get("/labAnalyst/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Models.LabAnalyst.findOne({
            where: {
                id,
            }
        });
        const idExaMed = result.ExaMedId;
        const exaMed = await Models.ExaMed.findOne({
            where: {
                id:idExaMed,
            }
        });
        const resultado = {}
        resultado["name"] = result.name
        resultado["lastName"] = result.lastName
        resultado["email"] = result.email
        resultado["password"] = result.password
        resultado["identityDoc"] = result.identityDoc
        resultado["nroColegiatura"] = result.nroColegiatura
        resultado["gender"] = result.gender
        resultado["phone"] = result.phone
        resultado["createdAt"] = result.createdAt
        resultado["updatedAt"] = result.updatedAt
        resultado["exaMed"] = exaMed
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully LabAnalyst Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesLabAnalyst.post("/labAnalyst", async (req, res) => {

    try {
        await Models.LabAnalyst.sync()
        const result = await Models.LabAnalyst.create({
            name: faker.internet.userName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            identityDoc: 2311,
            nroColegiatura:23444,
            gender: faker.person.gender(),
            phone: 780239421,
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
routesLabAnalyst.put("/labAnalyst/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataLabAnalyst = req.body;
        await Models.LabAnalyst.sync()
        const result = await Models.LabAnalyst.update({
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
routesLabAnalyst.delete("/labAnalyst/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Models.LabAnalyst.destroy({
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
module.exports={routesLabAnalyst};