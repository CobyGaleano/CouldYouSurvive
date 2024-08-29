/*console.log(Preguntas);
let puntuacion = 0;


function mostrarPregunta() {
    if (currentQuestionIndex >= Preguntas.length) {
        verificarPuntuacion(puntuacion, localStorage.getItem('nombre'));
        return;
    }

    document.getElementById("preguntasSection").style.display = "block";
    document.getElementById("preguntaActual").innerText = Preguntas[currentQuestionIndex];

    document.getElementById("btnSi").onclick = () => {
        puntuacion += verificaRespuesta(true, currentQuestionIndex);
        console.log(`Pregunta ${currentQuestionIndex + 1}: Respuesta Sí, Puntuación: ${puntuacion}`);
        currentQuestionIndex++;
        mostrarPregunta();
    };

    document.getElementById("btnNo").onclick = () => {
        puntuacion += verificaRespuesta(false, currentQuestionIndex);
        console.log(`Pregunta ${currentQuestionIndex + 1}: Respuesta No, Puntuación: ${puntuacion}`);
        currentQuestionIndex++;
        mostrarPregunta();
    };
}

function verificaRespuesta(respuesta, i) {
    if ((respuesta !== false && i !== 2 && i !== 4) || (respuesta === false && (i === 2 || i === 4))) {
        return 10;
    } else {
        return -5;
    }
}

function verificarPuntuacion(puntuacion, nombre) {
    let resultadoText;
    let resultadoClass;

    if (puntuacion < 25) {
        resultadoText = `${nombre}, mala suerte, la próxima no sigas tu instinto. Tu puntaje es: ${puntuacion}`;
        resultadoClass = 'resultado-bajo';
    } else if (puntuacion >= 75) {
        resultadoText = `Felicidades ${nombre}, no se podría haber hecho mejor. Tu puntaje es: ${puntuacion}`;
        resultadoClass = 'resultado-optimo';
    } else {
        resultadoText = `${nombre}, todavía tenés por aprender pero lo importante es que sobreviviste. Tu puntaje es: ${puntuacion}`;
        resultadoClass = 'resultado-medio';
    }

    console.log(`Resultado final para ${nombre}: ${puntuacion}`);
    document.getElementById("preguntasSection").style.display = "none";
    document.getElementById("resultadoSection").style.display = "block";
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerText = resultadoText;
    resultadoDiv.className = resultadoClass;

    setTimeout(resetQuiz, 5000); // Espera 5 segundos antes de reiniciar el quiz
}

function resetQuiz() {
    document.getElementById("diasEsperados").value = "";
    document.getElementById("nombreUsuario").value = "";
    document.getElementById("preguntasSection").style.display = "none";
    document.getElementById("resultadoSection").style.display = "none";
    currentQuestionIndex = 0;
    puntuacion = 0;
}

function preguntarNombre(){
    let nombre = localStorage.getItem("nombre");
    if (nombre === "") {
        $("#modal-edad").modal("show");
      } else {
        validarEdad(edad);
      }
}

function respuestaCorrecta(){

}

//main
function comenzarCuestionario(){
    document.getElementById("btnComenzar").addEventListener("click", function(event) {
        puntuacion = 25;
        let diasEsperados = document.getElementById("diasEsperados").value;
        let nombre = document.getElementById("nombreUsuario").value;
        
        if (nombre === "") {
            alert("Por favor, ingresa tu nombre para comenzar el quiz.");
            return;
        }

        if (diasEsperados === "") {
            alert("Por favor, ingresa un valor numérico en los días esperados.");
            return;
        }

        localStorage.setItem('diasEsperados', diasEsperados);
        localStorage.setItem('nombre', nombre);

        console.log(`Días esperados: ${diasEsperados}`);
        console.log(`Nombre: ${nombre}`);
        console.log(`Puntuación inicial: ${puntuacion}`);

        mostrarPregunta();

    });
}*/

let jugador; // Variable para almacenar la instancia del jugador
let currentQuestionIndex = 0;

document.addEventListener("DOMContentLoaded", function() {
    Swal.fire({
        title: 'Ingrese su nombre',
        input: 'text',
        inputPlaceholder: 'Escribe tu nombre aquí',
        showCancelButton: false,
        confirmButtonText: 'Guardar Nombre',
        inputValidator: (value) => {
            if (!value) {
                return '¡El nombre es requerido!';
            }
            // Guardar el nombre en localStorage y crear objeto Jugador
            const nombre = value;
            jugador = new Jugador(nombre, 0);
            return null;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            console.log(`Nombre guardado: ${jugador.nombre}`);
            cargarPreguntas();
        }
    });
});

function cargarPreguntas() {
    fetch('preguntas.json')
        .then(response => response.json())
        .then(data => {
            Preguntas = data;
            console.log("Preguntas cargadas:", Preguntas);
            setupEventListeners();
        })
        .catch(error => console.error('Error cargando preguntas:', error));
}

function setupEventListeners() {
    document.getElementById("btnComenzar").addEventListener("click", function(event) {
        const diasEsperados = document.getElementById("diasEsperados").value;

        if (jugador === undefined) {
            Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: 'El nombre es requerido para comenzar el quiz.',
            });
            return;
        }

        if (diasEsperados === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: 'Por favor, ingresa un valor numérico en los días esperados.',
            });
            return;
        }

        jugador.diasEsperados = diasEsperados;
        jugador.puntuacion += parseInt(diasEsperados, 10); // Agrega los días esperados a la puntuación inicial

        console.log(`Días esperados: ${diasEsperados}`);
        console.log(`Nombre: ${jugador.nombre}`);
        console.log(`Puntuación inicial: ${jugador.puntuacion}`);

        mostrarPregunta();
    });
}

function mostrarPregunta() {
    if (currentQuestionIndex >= Preguntas.length) {
        jugador.calcularPuntuacion();
        verificarPuntuacion(jugador);
        return;
    }

    document.getElementById("preguntasSection").style.display = "block";
    document.getElementById("preguntaActual").innerText = Preguntas[currentQuestionIndex];

    document.getElementById("btnSi").onclick = () => {
        jugador.agregarRespuesta(true);
        console.log(`Pregunta ${currentQuestionIndex + 1}: Respuesta Sí, Puntuación: ${jugador.puntuacion}`);
        currentQuestionIndex++;
        mostrarPregunta();
    };

    document.getElementById("btnNo").onclick = () => {
        jugador.agregarRespuesta(false);
        console.log(`Pregunta ${currentQuestionIndex + 1}: Respuesta No, Puntuación: ${jugador.puntuacion}`);
        currentQuestionIndex++;
        mostrarPregunta();
    };
}

function verificarPuntuacion(jugador) {
    const resultadoText = jugador.getResultado();
    let resultadoClass;

    if (jugador.puntuacion < 25) {
        resultadoClass = 'resultado-bajo';
    } else if (jugador.puntuacion >= 75) {
        resultadoClass = 'resultado-optimo';
    } else {
        resultadoClass = 'resultado-medio';
    }

    console.log(`Resultado final para ${jugador.nombre}: ${jugador.puntuacion}`);
    document.getElementById("preguntasSection").style.display = "none";
    document.getElementById("resultadoSection").style.display = "block";
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerText = resultadoText;
    resultadoDiv.className = resultadoClass;

    setTimeout(resetQuiz, 5000); // Espera 5 segundos antes de reiniciar el quiz
}

function resetQuiz() {
    document.getElementById("diasEsperados").value = "";
    document.getElementById("nombreUsuario").value = "";
    document.getElementById("preguntasSection").style.display = "none";
    document.getElementById("resultadoSection").style.display = "none";
    currentQuestionIndex = 0;
    jugador = null; // Reiniciar la instancia del jugador
}