import { Component, OnInit, Input } from '@angular/core';
import { Mensaje } from './../../models/mensaje';
import { MensajeService } from './../../servicios/mensaje.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
   <div class="bg-dark text-white" >
      <div class="modal-header">
      <h2 class="modal-title">Mensaje enviado con exito</h2>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p class="text-center h3">Resumen del mensaje</p>
      <p> <span class="h5" >De: </span> {{de}}</p>
      <p> <span class="h5" >Para: </span> {{para}}</p>
      <p> <span class="h5" >Mensaje: </span> {{mensaje}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="activeModal.close('Close click')">Cerrar</button>
    </div>
   </div>
  `
})
export class NgbdModalContent {
  @Input() de;
  @Input() para;
  @Input() mensaje;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.css']
})
export class MensajeriaComponent implements OnInit {

  mensajes:Array<any>;
  mensaje:Mensaje;
  tamanioMaximo = 120;
  tamanioActual= 120;

  constructor(private servicio:MensajeService, private modalService: NgbModal) {
    this.mensajes = new Array<Mensaje>();
    this.mensaje = new Mensaje();
    this.cargarMensajes();
  }
  
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.de =this.mensaje.de;
    modalRef.componentInstance.para =this.mensaje.para;
    modalRef.componentInstance.mensaje =this.mensaje.mensaje;
  }

  enviarMensaje(){
    this.mensaje.fecha = new Date();
    this.servicio.add(this.mensaje);
    this.open();
    this.mensaje = new Mensaje();
    this.cargarMensajes();
    this.tamanioActual = 120;
  }

  cargarMensajes(){
    this.mensajes = this.servicio.getMensajes();
  }

  cambiarTamanio(){
    this.tamanioActual = this.tamanioMaximo - this.mensaje.mensaje.length;
  }

  limpiarMensaje(){
    this.mensaje.mensaje ="";
    this.mensaje.de=0;
    this.mensaje.para=0;
    this.tamanioActual = this.tamanioMaximo;
  }

  ngOnInit(): void {
  }
}