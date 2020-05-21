export class Asistente {

    id:number;
    usuario:string;
    nombreOrganizacion:string;
    solicitaConstancia:boolean;

    constructor(usuario?:string,nombreOrganizacion?:string,solicitaConstancia?:boolean){
        this.usuario=usuario;
        this.nombreOrganizacion=nombreOrganizacion;
        this.solicitaConstancia=solicitaConstancia;
    }
}
