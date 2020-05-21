import { Component, OnInit } from '@angular/core';
import { Palabra } from './../../models/palabra';
import { PalabraService } from './../../servicios/palabra.service';
@Component({
  selector: 'app-palabra',
  templateUrl: './palabra.component.html',
  styleUrls: ['./palabra.component.css']
})
export class PalabraComponent implements OnInit {

  listaPalabras:Array<any> = new Array<Palabra>();
  palabraUnica:Palabra = new Palabra();
  palabraDesifrada:Array<any> = new Array<string>();
  palabraNoDesifrada:Array<any> = new Array<string>();
  alfabeto:Array<string> = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',]
  letraPresionada:string;
  partidaActual:number = 0;
  indice:number=0;
  puntaje:number = -1;
  vida:number = 6;
  tematica:number=0;

/*si se desea conservar la memoria de la pagina intentar hacerlo en un servicio*/
  constructor(private servicio:PalabraService) {
    this.cargarAnimales();
    this.siguientePalabra();
   }

   cambiarTematica(tematica:number){
     this.partidaActual = this.tematica;
     this.siguientePalabra();   
     this.puntaje=0;
     this.vida=6;
   }

   siguientePalabra(){
     this.refrescar();
     this.puntaje ++;
     this.palabraUnica = this.listaPalabras[this.partidaActual];
     this.cargarPalabraDesifrada();
     this.partidaActual ++;
     
     if(this.puntaje==10){
      alert("Felicidades Usted a Ganado");
      this.resetearPartida(this.tematica);
     }
   }

   refrescar(){
    this.palabraDesifrada = new Array<string>();
    this.palabraUnica = new Palabra();
    this.letraPresionada = "";
    this.palabraNoDesifrada = new Array<string>();
   }
   cargarPalabraDesifrada(){
    for(var i=0;i<this.palabraUnica.palabraIngles.length;i++){
      this.palabraDesifrada[i] = this.palabraUnica.palabraIngles[i];
    }
   }

   probarIntento(){
     if(this.letraPresionada == this.palabraDesifrada[this.indice]){
      this.palabraNoDesifrada[this.indice] = this.letraPresionada;
      if(this.verificarPalabras())
        this.siguientePalabra();
     }
     else{
      if(this.letraPresionada != "")
        this.vida--;
        if(this.vida==0){
          alert("Perdio :(")
          this.resetearPartida(this.tematica);
        }
     }
   }
   resetearPartida(tematica:number){
     this.partidaActual = tematica;
     this.vida = 6;
     this.puntaje = -1;
     this.siguientePalabra();
   }
   verificarPalabras(){
     var coinciden:boolean=true;
     for(var i=0;i<this.palabraDesifrada.length && coinciden;i++){
       if(this.palabraDesifrada[i] != this.palabraNoDesifrada[i])
        coinciden=false;
     }
     return coinciden;
   }

  guardarLetraTeclado(event){
    this.letraPresionada = event.target.value;
    this.probarIntento();
  }

  guardarLetraBoton(letra:string){
    this.letraPresionada = letra;
    this.probarIntento();
  }
   cargarAnimales(){
     this.listaPalabras = this.servicio.getPalabras();
   }
  ngOnInit(): void {
  }
}
