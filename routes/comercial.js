const express = require("express");
const router = express.Router();

const comercialService = require ("../services/comercialService");

router.get("/", async function (req,res) {

    let msg,code;

    try{
        code = 200;
        msg = "Todos los comerciales obtenidos correctamente.";
        const buscadorTotal = await comercialService.getAllComercial();

        res.status(200).json({code,msg,buscadorTotal});

    }catch(err){
        console.error(err.message);
        res.status(501).json({msg: "Error al obtener la lista de comerciales, revisa la consola."});
    }
    
});

router.get("/:id", async function (req,res) {

    let code,msg;

    const id = req.params.id;
    
    try{

        code = 200;
        msg = "EL comercial con el id " +id+ " ha sido buscado correctamente";
        const buscaPorId = await comercialService.getOneComercial(id);

        res.status(200).json({code,msg,buscaPorId});

    }catch(err){
        console.error(err.message);
        res.status(501).json({msg: "Error al obtener el comercial a traves del id, revisa la consola."});
    }
    
});

module.exports = router;