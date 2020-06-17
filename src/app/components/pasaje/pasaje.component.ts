import { Component, OnInit } from '@angular/core';
import { Pasaje } from './../../models/pasaje';
import { PasajeService } from './../../servicios/pasaje.service';
import { ToastrService } from 'ngx-toastr';
import { Adelanto } from './../../models/adelanto';
@Component({
  selector: 'app-pasaje',
  templateUrl: './pasaje.component.html',
  styleUrls: ['./pasaje.component.css']
})
export class PasajeComponent implements OnInit {

  listaPasajes: Array<any>;
  pasaje: Pasaje;
  adelanto: Adelanto;
  descuento: string;
  showDescuento:boolean = false;
  showModificar:boolean = false;
  showTables:boolean = false;
  validarMonto:number = 1;
  desactivarModificar:number = 0;

  constructor(private servicio: PasajeService, private _toa: ToastrService) {
    this.listaPasajes = new Array<Pasaje>();
    this.pasaje = new Pasaje();
    this.adelanto = new Adelanto();
    this.getPasajes();
  }
  getPasajes() {
    this.listaPasajes = new Array<Pasaje>();
    this.servicio.getPasajes().subscribe(
      (result) => {
        console.log(result);
        result.forEach(element => {
          Object.assign(this.pasaje ,element);
          this.listaPasajes.push(this.pasaje);
          this.pasaje = new Pasaje();
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

  addPasaje(){
    this.pasaje.fechaCompra = new Date();
    this.pasaje.montoAPagar = this.pasaje.precioPasajeDescuento;
    this.servicio.addPasaje(this.pasaje).subscribe(
      (result) => {
        console.log(result);
        this._toa.success('Registrado correctamente', 'Exito');
      },
      (error) => {
        console.log(error);
        this._toa.error('Ha ocurrido un error', 'Error');
      }
    )
    this.showDescuento = false;
    this.getPasajes();
    this.pasaje = new Pasaje();
  }

  eliminarPasaje(pasaje: Pasaje) {
    this.servicio.deletePasaje(pasaje).subscribe(
      (result) => {
        console.log(result);
        this._toa.error('Elimando correctamente', 'Exito');    
      },
      (error) => {
        console.log(error);
        this._toa.error('ERROR', 'Error');
      }
    )
    this.getPasajes();
    this.pasaje = new Pasaje();
  }

  mostrarModificar(pasajeModificar:Pasaje){
    this.pasaje = pasajeModificar;
    this.pasaje.fechaPasaje = null;
    this.showModificar = true;
    this.desactivarModificar = 1;
    console.log(this.pasaje);
  }

  modificarPasaje() {
    this.servicio.updatePasaje(this.pasaje).subscribe(
      (result) => {
        console.log(result);
        this._toa.info('Modificado correctamente', 'Exito');
      },
      (error) => {
        console.log(error);
        this._toa.error('Ha ocurrido un error', 'Error');
      }
    )
    this.showDescuento = false;
    this.getPasajes();
    this.cancelarModificar();
  }

  cancelarModificar(){
    this.pasaje = new Pasaje();
    this.showModificar = false;
    this.desactivarModificar = 0;
  }

  validarAdelanto(){
    if(this.adelanto.cobrador != null && this.adelanto.montoAdelanto <= this.pasaje.montoAPagar && this.adelanto.montoAdelanto != null && this.adelanto.montoAdelanto > 0)
      this.validarMonto = 0;
    else
      this.validarMonto = 1;
  }

  addAdelanto(){
    this.adelanto.fecha = new Date();
    this.pasaje.montoAPagar -= this.adelanto.montoAdelanto;
    this.pasaje.adelantos.push(this.adelanto);
    this.modificarPasaje();
    this.validarMonto = 1;
    this.cerrarTabla();
    this.adelanto = new Adelanto();
  }

  eliminarAdelanto(adelanto:Adelanto, indice:number){
    this.pasaje.montoAPagar += this.pasaje.adelantos[indice].montoAdelanto;
    this.pasaje.adelantos.splice(indice,1);
    this.modificarPasaje();
    this.validarMonto = 1;
    this.cerrarTabla();
    this.adelanto = new Adelanto();
  }

  expandirTabla(pasaje:Pasaje){
    this.pasaje = pasaje;
    this.showTables = true;
  }
  cerrarTabla(){
    this.pasaje = new Pasaje();
    this.adelanto = new Adelanto();
    this.showTables = false;
  }

  calcular() {
    if (this.pasaje.precioPasaje != null && this.pasaje.categoriaPasajero != null) {
      switch (this.pasaje.categoriaPasajero) {
        case "A":
          this.pasaje.precioPasajeDescuento = this.pasaje.precioPasaje;
          this.descuento = "0%"
          break;
        case "M":
          this.pasaje.precioPasajeDescuento = this.pasaje.precioPasaje - (this.pasaje.precioPasaje * 0.25);
          this.descuento = "25%"
          break;
        case "J":
          this.pasaje.precioPasajeDescuento = this.pasaje.precioPasaje - (this.pasaje.precioPasaje * 0.50);
          this.descuento = "50%"
          break;
      }
      this.showDescuento = true;
    } else {
      this.pasaje.precioPasajeDescuento = null;
      this.showDescuento = false;
    }
  }

  

  ngOnInit(): void {
  }
}