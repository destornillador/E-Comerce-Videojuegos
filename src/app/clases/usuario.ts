export class Usuario {
    
    constructor(public id: number, 
    public usuario: string,
    public contrasenia:string,
    public nombre: string,        
    public apellido: string,
    public sexo: string,
    public email: string,
    public telefono: number,
    public fechaNacimiento: string,
    public tipoUsuarioId: number,
    public estado:number) { 
        this.id = id;
        this.usuario = usuario;
        this.contrasenia = contrasenia;
        this.nombre = nombre;
        this.apellido = apellido;
        this.sexo = sexo;
        this.email = email;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.tipoUsuarioId = tipoUsuarioId;
        this.estado = estado;
    }
}