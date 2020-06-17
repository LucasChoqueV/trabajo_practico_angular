import { Injectable } from '@angular/core';

import { Mensaje } from './../models/mensaje';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  urlBase: string = "http://localhost:3000/api/mensajes/";
  constructor(private _http: HttpClient) {
  }

  addMensaje(mensaje: Mensaje): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    var body = JSON.stringify(mensaje);
    return this._http.post(this.urlBase, body, httpOptions);
  }

  getMensajes(): Observable<any> {
    return this._http.get(this.urlBase);
  }
}
