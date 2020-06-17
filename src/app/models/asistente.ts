export class Asistente {

    _id:number;
    usuario:string;
    organizacion:string;
    constancia:boolean;

    constructor(_id?:number,usuario?:string,organizacion?:string,constancia?:boolean){
        this._id = _id;
        this.usuario=usuario;
        this.organizacion=organizacion;
        this.constancia=constancia;
    }
}
