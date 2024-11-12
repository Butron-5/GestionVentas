const db = require('./db');
const helper = require('../helper');
const config = require('../config');

/**
*Funcion para recuperar todos los comerciales disponibles.
*@returns {Array} lista de todos los comerciales.
*/

async function getAllComercial() {

    let sql = "SELECT * FROM comercial"
   
    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);

    return data
}

async function getOneComercial(id) {

    let sql = "SELECT * FROM comercial WHERE id=" +id+ ";"
    
    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);

    return data
    
}

async function newComercial(comercial) {

    let sql = "INSERT INTO `comercial`(`nombre`, `apellido1`, `apellido2`, `comision`) VALUES (";
    sql+= "'"+comercial.nombre+"','"+comercial.apellido1+"','"+comercial.apellido2+"','"+comercial.comision+"');";

    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);

    return data;

}
module.exports = {
    getAllComercial,
    getOneComercial,
    newComercial
}