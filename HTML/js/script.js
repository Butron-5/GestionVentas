function buscar(){
    const errorElement = document.getElementById("error");
    errorElement.textContent = "";
    //con esto se borra el alert 
    alert("Hola boton");
    //creamos url de servicio
    const url = "http://localhost:3000/comercial";

    /*El fetch es la llamada localhost:3000/comercial (por ejemplo) que hariamos en postman*/
    fetch(url, {method:'GET'/*metodo de la llamada*/}).then(/*Aqui tratamos las respuesta, es decir, lo que nos devuelve
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
};

function buscarId(){
    const idComercial = document.getElementById("identificador");
   
    const url = "http://localhost:3000/comercial/" +idComercial.value;

    fetch(url, {method: 'GET'}).then(
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
};
function rellenarTabla(data){//data es un array de datos que hay que pintar

    const table = document.getElementById("resultados");

    table.innerHTML = '';

    let out = '';
    for(let item of data){
        out += '<tr>'; 

        for(let value of Object.values(item)){
            out += '<td>' + value + '</td>';
        }
       /* out += '<td>' + item.id + '</td>';
        out += '<td>' + item.nombre + '</td>';
        out += '<td>' + item.apellido1 + '</td>';
        out += '<td>' + item.apellido2 + '</td>';
        out += '<td>' + item.comision + '</td>';*/

        out += '</tr>'
    }

    table.innerHTML = out;
};