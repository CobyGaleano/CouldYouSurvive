/* const Preguntas = [{ id: 0, contenido: "¿Te pondiras en contacto con tu familia y planearias tu escape?", respuesta: "Si", diasVida: 10 },
{ id: 1, contenido: "¿Puedes correr a alta velocidad por más de 5min?", respuesta: "Si", diasVida: 10 },
{ id: 2, contenido: "Ante una orda de zombies impidiendo tu paso ¿Pasarias corriendo entre ellos?", respuesta: "No", diasVida: 10 },
{ id: 3, contenido: "¿Buscarias compañia para afrontar la pandemia?", respuesta: "Si", diasVida: 10 },
{ id: 4, contenido: "En una situacion desesperada ¿Comerias carne de zombie? ", respuesta: "No", diasVida: 10 },
{ id: 5, contenido: "¿Que arma escogerias?", respuesta: "Ballesta", diasVida: 10 },
{ id: 6, contenido: "Una tarea importante a la hora de un apocalipsis zombie es elegir bien tu comida...¿Cuál escogerias?", respuesta: "Enlatados", diasVida: 10 }
];
*/

const preguntasJson = "./preguntas.json";
const jugadorJson = "./jugador.json"

let Preguntas = [];//INSTANCIO ARRAY VACIO
let player = new Jugador(); //INSTANCIO UN OBJETO DE TIPO JUGADOR
const nodoPreguntas = document.getElementById("PreguntasHTML");
let currentQuestionIndex = 0;
let diasTotales = 25;

//BUSCA DENTRO DEL ARCHIVO .JSON PARA PODER TOMAR SU CONTENIDO Y CONVERTIRLO EN UN ARRAY
const buscadoraPreguntas = async () => {
    let data = await fetch(preguntasJson);
    let questions = await data.json();
    console.log(questions);
    return questions;
}


//--------------IMPLEMENTACION MAIN--------------
async function main() {
    //seleccionarEdad();
    ingresarNombre();
    Preguntas = await buscadoraPreguntas();
    document.getElementById("btnComenzar").addEventListener("click", function (event) {
        console.log("NOMBRE JUGADOR = " + player.getNombre());
        let contador = 0;
        if (document.getElementById("diasEsperados").value != null && document.getElementById("diasEsperados").value != "")//EVALUA QUE SE HAYA INGRESADO ALGO AL TXT-DIAS-ESPERADOS
        {
            console.log("Es: " + document.getElementById("diasEsperados").value);
            mostrarPregunta(contador);
        }
        else {
            //posible modal de advertencia, estilo SweetAlert
            modalDiasVacio();
            /* nodoPreguntas.innerHTML = `<div>
            <h1>ERROR! DEBE INGRESAR UN NUMERO</h1>
            </div>`; */
        }
    });
}

//-----------------DECLARACION E IMPLEMANTACION DE FUNCIONES-----------
async function ingresarNombre()
{
    const { value: text } = await Swal.fire({
        input: "text",
        inputLabel: "Como te llamas?",
        inputPlaceholder: "Ingrese tu nombre aqui...",
        inputAttributes: {
          "aria-label": "Type your message here"
        },
    });

    if (text != null) {
        player.setNombre(text);
    }
    else
    {
        Swal.fire({
            title: "Ingrese su nombre",
            text: "Ingrese un nombre",
            icon: "error"
        })
        player.setNombre("NATALIA-NATALIA");
    }
}

async function seleccionarEdad(){
    await Swal.fire({
        title: "Que edad tienes?",
        icon: "question",
        input: "range",
        inputLabel: "Tu edad",
        inputAttributes: {
          min: "8",
          max: "60",
          step: "1"
        },
        inputValue: 25
    }).then((result)=>{
        if(result.isConfirmed)
        {
            player.setEdad(result.value);
        }
        
    })
}

function dibujarHTML(nodo, array, index) {
    console.log("Index actual:" + parseInt(index));
    console.log("Id Array: " + parseInt(array.id));
    if ((array.id) == 5) {
        nodo.innerHTML = `<div>
        <p>Contenido:${array.contenido}</p>
        <button type="submit" id= "respuesta"> Cuchillo</button>
        <button type="submit" id= "respuesta">${array.respuesta}</button>
        <button type="submit" id= "respuesta"> Katana</button>
        <p>Dias de Vida:${array.diasVida}</p>
        </div>`;
    }

    else if ((array.id) == 6) {
        nodo.innerHTML = `<div>
            <p>Contenido:${array.contenido}</p>
            <button type="submit" id= "respuesta">${array.respuesta}</button>
            <button type="submit" id= "respuesta"> Frescos</button>
            <button type="submit" id= "respuesta">¿Pedidos ya?</button>
            <p>Dias de Vida:${array.diasVida}</p>
            </div>`;
    }
    else if ((array.id) == 2 || (array.id) == 4) {
        nodo.innerHTML = `<div>
            <p>Contenido:${array.contenido}</p>
            <button type="submit" id= "respuesta">${array.respuesta}</button>
            <button type="submit" id= "respuesta">Si</button>
            <p>Dias de Vida:${array.diasVida}</p>
            </div>`;
    }
    else {
        nodo.innerHTML = `<div>
            <p>Contenido:${array.contenido}</p>
            <button type="submit" id= "respuesta">${array.respuesta}</button>
            <button type="submit" id= "respuesta">No</button>
            <p>Dias de Vida:${array.diasVida}</p>
            </div>`;
    }
}


function evaluarRespuesta(boton) {
    let seleccionado = boton.innerText;
    let respuestaCorrecta = Preguntas[currentQuestionIndex];
    if (seleccionado == respuestaCorrecta.respuesta) {
        return respuestaCorrecta.diasVida;

    }
    else {
        return -5;
    }
    
}

function sweetAlertModalSi() {
    Swal.fire({
        imageUrl: "https://media1.tenor.com/m/Xe0CHhfeae8AAAAd/say-zombie-ben-goudy.gif",
        confirmButtonText: "Siguiente pregunta"
    });
}

function sweetAlertModalNo() {
    Swal.fire({
        imageUrl: "https://media1.tenor.com/m/_HEk7Cs64dsAAAAC/zombie-horde-of-zombies.gif",
        confirmButtonText: "Siguiente pregunta"
    });
}

function sweetAlertModalBallesta() {
    Swal.fire({
        imageUrl: "https://media1.tenor.com/m/38L6bFeqzsgAAAAd/daryl-dixon-norman-reedus.gif",
        confirmButtonText: "Siguiente pregunta"
    });
}

function sweetAlertModalEnlatados() {
    Swal.fire({
        imageUrl: "https://media1.tenor.com/m/gd-n0ABe_roAAAAd/bacon-double-cheeseburger-burger.gif",
        confirmButtonText: "Siguiente pregunta"
    });
}

function modalDiasVacio()
{
    Swal.fire({
        title: "Error",
        text: "Deberias intentar ingresando un numero",
        icon: "error"
      });
}


function seleccionarModal(key) {
    console.log("VALOR KEY= " + key.toLowerCase());
    switch (key.toLowerCase()) {
        case "no":
            sweetAlertModalNo();
            break;
        case "ballesta":
            sweetAlertModalBallesta();
            break;
        case "enlatados":
            sweetAlertModalEnlatados();
            break;
        default:
            sweetAlertModalSi();
            break;
    }
}


function evaluarBotones(botones) {
    let arrayBotones = Array.from(botones);
    console.log(arrayBotones);
    for (let boton of arrayBotones) {
        boton.addEventListener("click", () => {
            let diasGanados = evaluarRespuesta(boton);
            diasTotales += diasGanados;
            let btnRespuesta = boton.innerText;
            console.log("El contador en vuelta " + currentQuestionIndex + " es = " + diasTotales);
            currentQuestionIndex++;   //
            mostrarPregunta();    // Muestra la siguiente pregunta 
            console.log("value boton= " + btnRespuesta);
            seleccionarModal(btnRespuesta);
        });

    }
}

function evaluarPuntuacion(player)
{
    if(player.getPuntuacion()<=35){
        nodoPreguntas.innerHTML = `<p>Por suerte para ti no duro mucho... Días de vida totales: ${player.getPuntuacion()}</p>`;
    }
    else if(player.getPuntuacion()>=65){
        nodoPreguntas.innerHTML = `<p>¡Quiz completado! Eres digno portador de la ballesta. Días de vida totales: ${player.getPuntuacion()}</p>`;
    }
    else{
        nodoPreguntas.innerHTML = `<p>¡Quiz completado! Podrias hacerlo mejor, pero tampoco esta mal... Días de vida totales: ${player.getPuntuacion()}</p>`;
    }
}

function mostrarPregunta() {
    if (currentQuestionIndex < Preguntas.length) {
        dibujarHTML(nodoPreguntas, Preguntas[currentQuestionIndex], currentQuestionIndex);
        let botones = document.getElementsByTagName("button");
        console.log(botones);
        evaluarBotones(botones);

    } else {
        console.log("Dias totales: " + diasTotales);
        player.setPuntuacion(diasTotales);
        evaluarPuntuacion(player);
        //nodoPreguntas.innerHTML = `<p>¡Quiz completado! Días de vida totales: ${player.getPuntuacion()}</p>`;
    }
}

// ----------------LLAMADO AL MAIN--------------

main();