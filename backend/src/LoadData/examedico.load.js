const { Models } = require("../db.js");
const { faker } = require('@faker-js/faker');
const routesExaMed = require("express").Router();

routesExaMed.get("/examedico", async (req, res) => {
    try {
        const result = await Models.ExaMed.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ExaMeds Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesExaMed.get("/examedico/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Models.ExaMed.findOne({
            where: {
                id,
            }
        });
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ExaMed Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesExaMed.post("/examedico", async (req, res) => {

    try {
        await Models.ExaMed.sync()
        const result = await Models.ExaMed.create({
            state: faker.person.jobDescription(),
            comment: faker.number({ min: 1, max: 2}),
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ExaMed Created"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})
routesExaMed.put("/examedico/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataExaMed = req.body;
        await Models.ExaMed.sync()
        const result = await Models.ExaMed.update({
            state: dataExaMed.state,
            comment: dataExaMed.comment,
            Appointment: dataExaMed.Appointment,
            TipExaMed: dataExaMed.TipExaMed,
        },{
            where:{
                id,
            }
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ExaMed Update"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesExaMed.delete("/examedico/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Models.ExaMed.destroy({
            where:{
                id,
            }
        })
        res.status(204).json({
            status: 204,
            result: result,
            message: "Succesfully ExaMed Delete"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
module.exports={routesExaMed};