import { Component, OnInit } from '@angular/core';
import { Pasaje } from './../../models/pasaje';
import { PasajeService } from './../../servicios/pasaje.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pasaje',
  templateUrl: './pasaje.component.html',
  styleUrls: ['./pasaje.component.css']
})
export class PasajeComponent implements OnInit {

  listaPasajes: Array<any>;
  pasaje: Pasaje;
  descuento: string;
  mostrar: boolean = false;

  constructor(private servicio: PasajeService, private _toa: ToastrService) {
    this.listaPasajes = new Array<Pasaje>();
    this.pasaje = new Pasaje();
    this.cargarPasajes();
  }

  registrar() {
    if (this.pasaje.id != null) {
      this.servicio.updatePasaje(this.pasaje);
      this._toa.info('Modificado correctamente', 'Exito');
    } else {
      this.pasaje.fechaCompra = new Date();
      this.servicio.addPasaje(this.pasaje);
      this.cargarPasajes();
      this._toa.success('Registrado correctamente', 'Exito');
    }
    this.mostrar = false;
    this.pasaje = new Pasaje();
  }

  modificarPasaje(pasaje: Pasaje) {
    this.pasaje = pasaje;
  }

  eliminarPasaje(pasaje: Pasaje) {
    this.servicio.deletePasaje(pasaje.id);
    this.cargarPasajes();
    this._toa.error('Elimando correctamente', 'Exito');
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
      this.mostrar = true;
    } else {
      this.pasaje.precioPasajeDescuento = null;
      this.mostrar = false;
    }
  }

  cargarPasajes() {
    this.listaPasajes = this.servicio.getPasajes();
  }

  ngOnInit(): void {
  }
}