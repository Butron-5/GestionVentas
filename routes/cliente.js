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
router.get("/:id/buscar", async function (req,res) {

    const id = req.params.id;

    try{

        code = 200;
        msg = "Los pedidos del cliente con el id " +id+ " han sido encontrado correctamente.";
        const TotalPedidos = await clienteService.getAllPedidos(id);
        const TotalInvertido = await clienteService.getSumaTotal(id);
        
        res.status(200).json({code,msg,TotalInvertido,TotalPedidos});

    }catch(err){
        console.error(err.message);
        res.status(501).json({msg: "Error al obtener listado de pedidos, revisa la consola."});
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
        const cliente = await clienteService.newCliente(clientes);
        const clienteCreado = await clienteService.getClienteById(cliente.insertId)
        code = 200;
        msg = "Cliente nuevo creado correctamente " + cliente.insertId;

        res.status(200).json({code,msg,clienteCreado});
    }catch(err){

        console.error(err.message);
        res.status(501).json({msg: "Error al crear un nuevo cliente, revisa la consola."});
    }
}
});

module.exports = router;