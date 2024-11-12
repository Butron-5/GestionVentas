import { urlComercial,converToJson } from "./utilidades.js";
window.onload = function(){

const formulario = document.getElementById("formulario");

formulario.addEventListener('submit', function(e){

    alert("Le diste a submit");
    e.preventDefault();
    crearComercial();
})
};
function crearComercial(){
    
    var datos = new FormData (formulario);
    console.log(datos);
    console.log(datos.get('nombre'));
    console.log(datos.get('apellido1'));
    console.log(datos.get('apellido2'));
    console.log(datos.get('comision'));

    let jsonForm = converToJson(datos);

    fetch(urlComercial,{method:'POST', 
        body: JSON.stringify(jsonForm),
        headers: {'Content-Type':'application/json'}
    }).then(
        response => {
            console.log(response);
            return response.json();
        }).then(
            data=> {
                console.log(data);
            
            const muestramelo = document.getElementById("new");
            
            muestramelo.textContent = data.insertId + JSON.stringify(data.comercialCreado);
            }
        ).catch(error => {
            console.error("Error en catch: " +error.message);
            errorElement.textContent = "Error fetching comercial data: " + error.message;
        })
        formulario.reset(); 
};

