const Patient = require("../models/patient.model");
const { faker } = require('@faker-js/faker');
const routes =require("express").routes();

routes.get("/patient",async(req,res) =>{
    const patients = await Patient.findAll();
    res.status(200).json({
        ok:true,
        status:200,
        body:patients,
    })
});
routes.get("/patient/:id",async(req,res) =>{
    const id=req.params.id;
    const patient=await Patient.findOne({
        where:{
            id,
        }
    });
    res.status(200).json({
        ok:true,
        status:200,
        body:patient,
    })
});
routes.post("/patient",async(req,res)=>{
    await Patient.sync()
    const createPatient =await Patient.create({
        name: faker.internet.userName(),
        email:faker.internet.email(),
        password:faker.internet.password(),
    })
    res.status(201).json({
        ok:true,
        status:200,
        message:"Created Product",
    })
})
routes.put("/patient",async(req,res));
routes.delete("/patient",async(req,res));
