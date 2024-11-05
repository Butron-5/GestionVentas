const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAllclientes() {
    
    let sql = "SELECT * FROM cliente"

    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);

    return data
}

async function getClienteById(id) {
    
    let sql = "SELECT * FROM cliente WHERE id=" +id+ ";"

    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);

    return data
}

async function newCliente(cliente) {

    let sql = "INSERT INTO `cliente`(`nombre`,`apellido1`,`apellido2`,`ciudad`,`categoria`) VALUES (";7

    sql += "'"+cliente.nombre+"','"+cliente.apellido1+"','"+cliente.apellido2+"','"+cliente.ciudad+"','"+cliente.categoria+"');";

    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);

    return cliente
}
module.exports ={
    getAllclientes,
    getClienteById,
    newCliente
}