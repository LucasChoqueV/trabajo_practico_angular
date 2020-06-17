import { Empresa } from './empresa';
export class Mensaje {

    _id:number;
    para:number;
    de:number;
    mensaje:string;
    fecha:Date;
    empresa:Empresa;
    
    constructor(_id?:number, para?:number,de?:number,mensaje?:string,fecha?:Date){
        this._id = _id;
        this.para = para;
        this.de = de;
        this.mensaje = mensaje;
    }
}
