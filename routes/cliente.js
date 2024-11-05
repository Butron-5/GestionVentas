const express = require("express");
const router = express.Router();

const clienteService = require ("../services/clienteService");


router.get("/", async function (req,res) {

    let msg,code;

    try{
        code = 200;
        msg = "Todos los clientes obtenidos correctamente.";
        const TodosLosClientes = await clienteService.getAllclientes();

        res.status(200).json({code,msg,TodosLosClientes});

    }catch(err){
        console.error(err.message);
        res.status(501).json({msg: "Error al obtener la lista de clientes, revisa la consola."});
    }
    
});

router.get("/:id", async function (req,res) {

    let code,msg;

    const id = req.params.id;
    
    try{

        code = 200;
        msg = "EL cliente con el id " +id+ " ha sido buscado correctamente";
        const buscaPorId = await clienteService.getClienteById(id);

        res.status(200).json({code,msg,buscaPorId});

    }catch(err){
        console.error(err.message);
        res.status(501).json({msg: "Error al obtener el cliente a traves del id, revisa la consola."});
    }
    
});

router.post("/", async function (req,res) {
    
    const{id,nombre,apellido1,apellido2,ciudad,categoria} = req.body;
    let msg,code;

    if((nombre == undefined)||(apellido1 == undefined)||(apellido2 == undefined)){
        
        res.status(401).json({msg:"El nombre y los dos primeros apellidos son obligatorios para introducir un nuevo comercial."})
    }else{

        let clientes = {

            id:id,
            nombre:nombre,
            apellido1:apellido1,
            apellido2:apellido2,
            ciudad:ciudad,
            categoria:categoria
        }  
    try{
        const Cliente = await clienteService.newCliente(clientes);
        code = 200;
        msg = "Cliente nuevo creado correctamente."

        res.status(200).json({code,msg,Cliente});
    }catch(err){

        console.error(err.message);
        res.status(501).json({msg: "Error al crear un nuevo cliente, revisa la consola."});
    }
}
});

module.exports = router;