import { Injectable } from '@angular/core';

import { Mensaje } from './../models/mensaje';
@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  mensajes:Array<any>;
  constructor() {
    this.mensajes = new Array<Mensaje>();
    this.mensajes = [
      {
        idMensaje:1,
        para:111111,
        de:222222,
        mensaje:"Esto es un mensaje de prueba 1",
        fecha:"2014-01-01T23:28:56.782Z",
      }
    ]
   }

   add(mensaje:Mensaje){
     mensaje.idMensaje = this.generarID();
     this.mensajes.push(mensaje);
   }

   getMensajes(){
    return this.mensajes;
   }
   generarID(){
    var idActual:number;
    idActual= (this.mensajes[this.mensajes.length-1].idMensaje) +1;
    return idActual;
   }
}
