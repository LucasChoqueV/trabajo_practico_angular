export class Adelanto {
    _id:number;
    fecha: Date;
    cobrador: string;
    montoAdelanto: number;

    constructor(_id?:number, fecha?: Date, cobrador?: string, montoAdelanto?: number){
        this._id = _id;
        this.fecha = fecha;
        this.cobrador = cobrador;
        this.montoAdelanto = montoAdelanto;
    }
}
