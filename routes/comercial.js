const express = require("express");
const router = express.Router();

const comercialService = require ("../services/comercialService");

router.get("/", async function (req,res) {

    let msg,code;

    try{
        code = 200;
        msg = "Todos los comerciales obtenidos correctamente.";
        const todosLosComerciales= await comercialService.getAllComercial();

        res.status(200).json({code,msg,todosLosComerciales});

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

router.post("/", async function (req,res) {
    
    const{id,nombre,apellido1,apellido2,comision} = req.body;
    let msg,code;

    if((nombre == undefined)||(apellido1 == undefined)||(apellido2 == undefined)){
        
        res.status(401).json({msg:"El nombre y los dos primeros apellidos son obligatorios para introducir un nuevo comercial."})
    }else{

        let comer = {

            id:id,
            nombre:nombre,
            apellido1:apellido1,
            apellido2:apellido2,
            comision:comision,
        }  
    try{
        const comercial = await comercialService.newComercial(comer);
        code = 200;
        msg = "Comercial nuevo creado correctamente."

        res.status(200).json({code,msg,comercial});
    }catch(err){

        console.error(err.message);
        res.status(501).json({msg: "Error al crear un nuevo comercial, revisa la consola."});
    }
}
});

module.exports = router;