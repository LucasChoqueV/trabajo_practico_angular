import { Injectable } from '@angular/core';
import { Pasaje } from './../models/pasaje';
import { ThrowStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class PasajeService {

  listaPasajes:Array<any>;
  constructor() { 
    this.listaPasajes = new Array<Pasaje>();
    this.listaPasajes = [
      {
        id:1,
        dniPasajero:1111111,
        precioPasaje:50000,
        precioPasajeDescuento:50000,
        categoriaPasajero:"A",
        fechaCompra: new Date(),
        fechaPasaje: new Date(),
      }
    ]
  }

  addPasaje(pasaje:Pasaje){
    pasaje.id = this.generarID(pasaje);
    this.listaPasajes.push(pasaje);
  }

  updatePasaje(pasaje:Pasaje){
    for(var i=0;i<this.listaPasajes.length;i++){
      if(pasaje.id == this.listaPasajes[i].id){
        this.listaPasajes[i]=pasaje;
      }
    }
  }
  deletePasaje(id:number){
    var idBorrar = this.listaPasajes.findIndex((pasajeAux: Pasaje) => pasajeAux.id == id);
    this.listaPasajes.splice(idBorrar,1);
  }
  getPasajes(){
    return this.listaPasajes;
  }

  generarID(pasaje:Pasaje){
    return (this.listaPasajes[this.listaPasajes.length-1].id)+1;
  }
}
