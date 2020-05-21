import { Injectable } from '@angular/core';
import { Asistente } from './../models/asistente';
@Injectable({
  providedIn: 'root'
})
export class AsistenteService {

  listaAsistente:Array<any>
  constructor() {
    this.listaAsistente = new Array<Asistente>();
    this.listaAsistente = [
      {
        id:1,
        usuario:"Usuario 1",
        nombreOrganizacion:"Organizacion 1",
        solicitaConstancia:true,
      }
    ]
  }

  addAsistente(asistente:Asistente){
    asistente.id = this.generarID();
    this.listaAsistente.push(asistente);
  }

  getAsistentes(){
    return this.listaAsistente;
  }

  generarID(){
    return (this.listaAsistente[this.listaAsistente.length-1].id)+1;
  }
}
