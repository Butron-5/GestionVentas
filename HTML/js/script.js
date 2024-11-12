import { urlComercial,rellenarTabla } from "./utilidades.js";

function buscar(){
    const errorElement = document.getElementById("error");
    errorElement.textContent = "";
    //con esto se borra el alert 
    alert("Hola boton");
    /*El fetch es la llamada localhost:3000/comercial (por ejemplo) que hariamos en postman*/
    fetch(urlComercial, {method:'GET'/*metodo de la llamada*/}).then(/*Aqui tratamos las respuesta, es decir, lo que nos devuelve
        el postman cuando hacemos los metodos get,post,delete y put (respuesta http) y la guardamos en la variable response.
        La informacion de la respuesta la podemos recuperar, gestionar y enviar el json que nos ha llegado*/
       /*recoge los argumentos*/ response => {
            console.log(response);
            /*recoge la parte json*/return response.json();
        }).then(/*Recibimos el return del then anterior que es el json que nos ha devuelto el servidor. Lo guardamos en la variable data y 
            y trabajamos sus datos en su funcion.*/
            data=> {
                console.log(data);
                /*Con estas dos lineas pinto la infromacion de la base de datos en el html utilizando la función de abajo.*/
                const arrayComercial = data.todosLosComerciales;
                rellenarTabla(arrayComercial);
                errorElement.textContent = "Hemos recuperado el json.";
        }).catch(error => {
            console.error("Error en catch: " +error.message);
            errorElement.textContent = "Error fetching data: " + error.message;
        })
}; window.buscar = buscar;

function buscarId(){
    const idComercial = document.getElementById("identificador");
   
    fetch(urlComercial+"/"+idComercial.value, {method: 'GET'}).then(
        response=>{
            console.log(response);
            return response.json();
        }
    ).then(
        data=> {
            console.log(data);

            const comercial = data.buscaPorId;
            
            const muestramelo = document.getElementById("resComercial");
            
            muestramelo.textContent = JSON.stringify(comercial[0]);

        }
    ).catch(error => {
        console.error("Error en catch: " +error.message);
        errorElement.textContent = "Error fetching comercial data: " + error.message;
    })
};window.buscarId = buscarId;

