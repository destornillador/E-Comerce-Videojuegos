export class Articulo {
    
    constructor(public id: number, 
    public juegoId: number,
    public disponible:boolean,
    public codigo: string) { 
        this.id = id;
        this.juegoId = juegoId;
        this.disponible = disponible;
        this.codigo = codigo;
     }
}