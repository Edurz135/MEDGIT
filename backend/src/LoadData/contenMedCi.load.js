const { Models } = require("../db.js");
const routesContenMedCi = require("express").Router();

routesContenMedCi.get("/contenMedCi", async (req, res) => {
    try {
        const result = await Models.ContenMedCi.findAll();
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ContenMedCis Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesContenMedCi.get("/contenMedCi/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Models.ContenMedCi.findOne({
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
        resultado["createdAt"] = result.createdAt
        resultado["updatedAt"] = result.updatedAt
        resultado["exaMed"] = exaMed
        res.status(200).json({
            status: 200,
            result: resultado,
            message: "Succesfully ContenMedCi Returned"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesContenMedCi.post("/contenMedCi", async (req, res) => {

    try {
        await Models.ContenMedCi.sync()
        const result = await Models.ContenMedCi.create({

        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully contenMedCi Created"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
})
routesContenMedCi.put("/contenMedCi/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const dataContenMedCi = req.body;
        await Models.ContenMedCi.sync()
        const result = await Models.ContenMedCi.update({
            ExaMedId: dataContenMedCi.ExaMedId
        },{
            where:{
                id,
            }
        })
        res.status(200).json({
            status: 200,
            result: result,
            message: "Succesfully ContenMedCi Update"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
routesContenMedCi.delete("/contenMedCi/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const result = await Models.ContenMedCi.destroy({
            where:{
                id,
            }
        })
        res.status(204).json({
            status: 204,
            result: result,
            message: "Succesfully ContenMedCi Delete"
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
});
module.exports={routesContenMedCi};