import { Component, OnInit } from '@angular/core';
import { Asistente } from '../../models/asistente';
import { AsistenteService } from './../../servicios/asistente.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})

export class CursoComponent implements OnInit {

  asistente:Asistente;
  listaAsistentes:Array<any>;
  respuesta:string;

  constructor(private servicio:AsistenteService) {
    this.listaAsistentes = new Array<Asistente>();
    this.asistente = new Asistente();
    this.cargarAsistentes();
  }

  registrarAsistente(){
    this.respuesta=="True"?this.asistente.solicitaConstancia=true:this.asistente.solicitaConstancia=false;
    this.servicio.addAsistente(this.asistente);
    this.asistente = new Asistente();
  }

  cargarAsistentes(){
    this.listaAsistentes = this.servicio.getAsistentes();
  }

  ngOnInit(): void {
  }

  guardarRegistro(){
    this.registrarAsistente();
  }
}