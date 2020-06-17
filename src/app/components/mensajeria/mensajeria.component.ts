import { Component, OnInit, Input } from '@angular/core';
import { Mensaje } from './../../models/mensaje';
import { MensajeService } from './../../servicios/mensaje.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from './../../servicios/empresa.service';

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

  listMensajes:Array<Mensaje>;
  listEmpresas:Array<Empresa>;
  mensaje:Mensaje;
  tamanioMaximo = 120;
  tamanioActual= 120;

  constructor(private servicio:MensajeService, private servicioEmpresa:EmpresaService, private modalService: NgbModal) {
    this.listMensajes = new Array<Mensaje>();
    this.listEmpresas = new Array<Empresa>();
    this.mensaje = new Mensaje();
    this.getMensajes();
    this.getEmpresas();
  }

  
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.de =this.mensaje.de;
    modalRef.componentInstance.para =this.mensaje.para;
    modalRef.componentInstance.mensaje =this.mensaje.mensaje;
  }

  getMensajes(){
    this.listMensajes = new Array<Mensaje>();
    this.servicio.getMensajes().subscribe(
      (result) => {
        console.log(result);
        result.forEach(element => {
          Object.assign(this.mensaje,element);
          this.listMensajes.push(this.mensaje);
          this.mensaje = new Mensaje();
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getEmpresas(){
    this.servicioEmpresa.getEmpresas().subscribe(
      (result) => {
        this.listEmpresas = result;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  enviarMensaje(){
    this.mensaje.fecha = new Date();
    this.servicio.addMensaje(this.mensaje).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
    this.open();
    this.mensaje = new Mensaje();
    this.getMensajes();
    this.tamanioActual = 120;
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