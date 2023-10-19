const { Models } = require("../db.js");
const { faker } = require('@faker-js/faker');
const routesAppointment = require("express").Router();

routesAppointment.get("/appointment", async (req, res) => {
    try {
        const result = await Models.Appointment.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully Appointments Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesAppointment.get("/appointment/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Models.Appointment.findOne({
            where: {
                id,
            }
        });
        const idPatient = result.PatientId;
        const patient = await Models.Patient.findOne({
            where: {
                id:idPatient,
            }
        });
        const idDoctor = result.DoctorId;
        const doctor = await Models.Doctor.findOne({
            where: {
                id:idDoctor,
            }
        });
        const resultado = {}
        resultado["date"]=result.date
        resultado["time"]=result.time
        resultado["type"]=result.type
        resultado["diagnostic"]=result.diagnostic
        resultado["createdAt"]=result.createdAt
        resultado["updatedAt"]=result.updatedAt
        resultado["patient"]=patient
        resultado["doctor"]=doctor
        res.status(200).json({
            status: 200,
            result: resultado,
            message: "Succesfully Appointment Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesAppointment.post("/appointment", async (req, res) => {

    try {
        await Models.Appointment.sync()
        // Creo la fecha en el pasado
        let pastDate = faker.date.past();
        let timestamp = pastDate.getTime();// Lo convierto en timestamp
        let futureDate = faker.date.soon();
        let time = futureDate.getHours() + ":" + futureDate.getMinutes() + ":" + futureDate.getSeconds();//Consigo el tiempo 
        const result = await Models.Appointment.create({
            date: timestamp,
            time: time,
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
routesAppointment.put("/appointment/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataAppointment = req.body;
        await Models.Appointment.sync()
        const result = await Models.Appointment.update({
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
routesAppointment.delete("/appointment/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Models.Appointment.destroy({
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
module.exports={routesAppointment};