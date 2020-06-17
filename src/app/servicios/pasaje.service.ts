import { Injectable } from '@angular/core';
import { Pasaje } from './../models/pasaje';
import { ThrowStmt } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PasajeService {

  urlBase:string = "http://localhost:3000/api/pasajes/";
  
  constructor(private _http:HttpClient) {
  }

  addPasaje(pasaje:Pasaje):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/json"
      })
    }
    var body = JSON.stringify(pasaje);
    return this._http.post(this.urlBase, body, httpOptions);
  }

  updatePasaje(pasaje:Pasaje):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/json"
      })
    }
    var body = JSON.stringify(pasaje);
    return this._http.put(this.urlBase+pasaje._id, body, httpOptions);
  }
  deletePasaje(pasaje:Pasaje):Observable<any>{
    return this._http.delete(this.urlBase+pasaje._id);
  }
  getPasajes():Observable<any>{
    return this._http.get(this.urlBase);
  }
}