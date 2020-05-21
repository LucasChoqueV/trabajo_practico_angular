export class Mensaje {

    idMensaje:number;
    para:number;
    de:number;
    mensaje:string;
    fecha:Date;
    
    constructor(id?:number, para?:number,de?:number,mensaje?:string,fecha?:Date){
        this.idMensaje = id;
        this.para = para;
        this.de = de;
        this.mensaje = mensaje;
    }
}
