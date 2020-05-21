import { Component, OnInit } from '@angular/core';
import { Pasaje } from './../../models/pasaje';
import { PasajeService } from './../../servicios/pasaje.service';
@Component({
  selector: 'app-pasaje',
  templateUrl: './pasaje.component.html',
  styleUrls: ['./pasaje.component.css']
})
export class PasajeComponent implements OnInit {

  listaPasajes:Array<any>;
  pasaje:Pasaje;
  descuento:string;
  mostrar:boolean = false;

  constructor(private servicio:PasajeService) {
    this.listaPasajes = new Array<Pasaje>();
    this.pasaje = new Pasaje();
    this.cargarPasajes();
  }

  registrar(){
    if(this.validar()){
      if(this.pasaje.id != null){
        this.servicio.updatePasaje(this.pasaje);
      }else{
        this.pasaje.fechaCompra =  new Date();
        this.servicio.addPasaje(this.pasaje);
        this.cargarPasajes();
      }
      this.mostrar=false;
      this.pasaje = new Pasaje();
    }else{
      alert("Faltan campos");
    }
  }

  modificarPasaje(pasaje:Pasaje){
    this.pasaje = pasaje;
  }

  eliminarPasaje(pasaje:Pasaje){
    this.servicio.deletePasaje(pasaje.id);
    this.cargarPasajes();
  }

  calcular(){
    if(this.pasaje.precioPasaje != null && this.pasaje.categoriaPasajero != null){
      switch(this.pasaje.categoriaPasajero){
        case "A":
          this.pasaje.precioPasajeDescuento = this.pasaje.precioPasaje;
          this.descuento = "0%"
          break;
        case "M":
          this.pasaje.precioPasajeDescuento = this.pasaje.precioPasaje - (this.pasaje.precioPasaje*0.25);
          this.descuento = "25%"
          break;
        case "J":
          this.pasaje.precioPasajeDescuento = this.pasaje.precioPasaje - (this.pasaje.precioPasaje*0.50);
          this.descuento = "50%"
          break;
      }
      this.mostrar=true;
    }else{
      this.pasaje.precioPasajeDescuento = null;
      this.mostrar=false;
    }
  }

  validar(){
    if(this.pasaje.precioPasajeDescuento != null && this.pasaje.dniPasajero != null && this.pasaje.fechaPasaje)
      return true;
    else
      return false;
  }

  cargarPasajes(){
     this.listaPasajes = this.servicio.getPasajes();
  }

  ngOnInit(): void {
  }
}