import { Component, OnInit } from '@angular/core';
import { Asistente } from '../../models/asistente';
import { AsistenteService } from './../../servicios/asistente.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})

export class CursoComponent implements OnInit {

  asistente:Asistente;
  listaAsistentes:Array<any>;
  respuesta:string;
  show:boolean=false;

  constructor(private servicio:AsistenteService, private _toa:ToastrService) {
    this.listaAsistentes = new Array<Asistente>();
    this.asistente = new Asistente();
    this.getAsistentes();
  }
  
  addAsistente(){
    this.respuesta=="True"?this.asistente.constancia=true:this.asistente.constancia=false;
    this.servicio.addAsistente(this.asistente).subscribe(
      (result) => {
        this._toa.success("Registrado correctamente", "Exito");
      },
      (error) => {
        console.log(error);
        this._toa.error("Ha ocurrido un error","Error");
      }
    );
    this.asistente = new Asistente();
    this.getAsistentes();
    
  }

  deleteAsistente(asistenteBorrar:Asistente){
    this.servicio.deleteAsistente(asistenteBorrar).subscribe(
      (result) => {
        console.log(result);
        this._toa.error("Se ha eliminado","Eliminado");
      },
      (error) => {
        console.log(error);
        this._toa.error("Ha ocurrido un error","Error");
      }
    )
    this.getAsistentes();
  }

  updateAsistente(){
    this.respuesta=="True"?this.asistente.constancia=true:this.asistente.constancia=false;
    this.servicio.updateAsistente(this.asistente).subscribe(
      (result) => {
        console.log(result);
        this._toa.info("Se ha modificado","Modificado");
      },
      (error) => {
        console.log(error);
        this._toa.error("Ha ocurrido un error","Error");
      }
    )
    this.asistente = new Asistente();
    this.show=false;
    this.getAsistentes();
  }

  cargarModificacion(asistenteModificar:Asistente){
    this.asistente = asistenteModificar;
    this.show=true;

  }
  getAsistentes(){
    this.listaAsistentes = new Array<Asistente>();
    this.servicio.getAsistentes().subscribe(
      (result) => {
        result.forEach(element => {
          Object.assign(this.asistente, element);
          this.listaAsistentes.push(this.asistente);
          this.asistente = new Asistente();
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }
  
  ngOnInit(): void {
  }
}