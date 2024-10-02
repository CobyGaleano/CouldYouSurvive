class Jugador
{
    //CONTRUCTOR
    constructor(nombre,edad){
    this.nombre = nombre;
    this.edad = edad;
    this.puntuacion = 0;
    }

    //---------SETTERS-----------
    setNombre(nombre){
        this.nombre=nombre;
    }

    setEdad(edad){
        this.edad=edad;
    }

    setPuntuacion(num){
        this.puntuacion = num;
    }

    //------------GETTERS-----------
    getNombre(){
        return this.nombre;
    }

    getEdad(){
        return this.edad;
    }
    
    getPuntuacion(){
        return this.puntuacion;
    }

}