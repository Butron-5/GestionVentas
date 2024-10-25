const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAllComercial() {

    let sql = "SELECT * FROM comercial"
    console.debug(sql);
    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);

    return {data}
}

async function getOneComercial(id) {

    let sql = "SELECT * FROM comercial WHERE id=" +id+ ";"
    console.debug(sql);
    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);

    return {data}
    
}
module.exports = {
    getAllComercial,
    getOneComercial
}