export class Venta {
    
    constructor(public id: number, 
    public usuarioId: number,
    public nombre: string,
    public apellido: string,
    public email: string,
    public telefono: number,
    public precioTotal: number,
    public tipoRetiroId:number,
    public tipoRetiro:string,
    public zonaId: number,
    public zona: string,
    public domicilio: string,
    public formaPagoId: number,
    public formaPago: string,
    public cuotaId: number,
    public cuotaNumero: number,
    public interes: number,
    public estado: number,
    public descripcionEstado: string,
    public fecha: string,
    public tarjeta: number 
    ) { 
        this.id = id;
        this.usuarioId = usuarioId;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.precioTotal = precioTotal;
        this.tipoRetiroId = tipoRetiroId;
        this.tipoRetiro = tipoRetiro;
        this.zonaId = zonaId;
        this.zona = zona;
        this.domicilio = domicilio;
        this.formaPagoId = formaPagoId;
        this.formaPago = formaPago;
        this.cuotaId = cuotaId;
        this.cuotaNumero = cuotaNumero;
        this.interes = interes;
        this.estado = estado;
        this.descripcionEstado = descripcionEstado;
        this.fecha = fecha;
        this.tarjeta = tarjeta;
    }
}