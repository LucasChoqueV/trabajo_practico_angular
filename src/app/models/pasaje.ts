import { Adelanto } from './adelanto';
export class Pasaje {
    _id:number;
    dniPasajero:number;
    precioPasaje:number;
    precioPasajeDescuento:number;
    montoAPagar:number;
    categoriaPasajero:string;
    fechaCompra:Date;
    fechaPasaje:Date;
    adelantos:Array<Adelanto> = new Array<Adelanto>();
    constructor(){
        
    }
}
