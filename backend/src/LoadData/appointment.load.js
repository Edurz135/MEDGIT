const Appointment = require("../models/appointment.model");
const { faker } = require('@faker-js/faker');
const routes = require("express").routes();

routes.get("/appointment", async (req, res) => {
    try {
        const result = await Appointment.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Appointments Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.get("/appointment/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Appointment.findOne({
            where: {
                id,
            }
        });
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Appointment Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.post("/appointment", async (req, res) => {

    try {
        await Appointment.sync()
        const result = await Appointment.create({
            date: faker.datatype(),
            time: faker.date.soon(),
            type: faker.commerce.product(),
            diagnostic: faker.commerce.productAdjective(),
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Appointment Created"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})
routes.put("/appointment/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataAppointment = req.body;
        await Appointment.sync()
        const result = await LabAnalyst.update({
            date: dataAppointment.date,
            time: dataAppointment.time,
            type: dataAppointment.type,
            diagnostic: dataAppointment.diagnostic,
            PatientId: dataAppointment.PatientId,
            DoctorId: dataAppointment.DoctorId,
        },{
            where:{
                id,
            }
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Appointment Update"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routes.delete("/appointment/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Appointment.destroy({
            where:{
                id,
            }
        })
        res.status(204).json({
            status: 204,
            result: result,
            message: "Succesfully Appointment Delete"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});