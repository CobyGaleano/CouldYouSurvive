class Jugador {
    constructor(nombre, diasEsperados) {
        this.nombre = nombre;
        this.diasEsperados = parseInt(diasEsperados, 10) || 0; // Asegúrate de que sea un número
        this.puntuacion = 25; // Inicialmente, 25 días de gracia
        this.respuestas = []; // Array para almacenar respuestas
    }

    agregarRespuesta(respuestaCorrecta) {
        this.respuestas.push(respuestaCorrecta);
    }

    calcularPuntuacion() {
        this.puntuacion += this.respuestas.reduce((total, respuesta) => respuesta ? 10 : -5, 0);
    }

    getResultado() {
        if (this.puntuacion < 25) {
            return `${this.nombre}, mala suerte, la próxima no sigas tu instinto. Tu puntaje es: ${this.puntuacion}`;
        } else if (this.puntuacion >= 75) {
            return `Felicidades ${this.nombre}, no se podría haber hecho mejor. Tu puntaje es: ${this.puntuacion}`;
        } else {
            return `${this.nombre}, todavía tenés por aprender pero lo importante es que sobreviviste. Tu puntaje es: ${this.puntuacion}`;
        }
    }
}