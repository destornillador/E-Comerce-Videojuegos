export class Juego {
    
    constructor(public id: number, 
    public titulo: string,
    public precio:number,
    public stock: number,        
    public plataformaId: number,
    public generoId: number,
    public formatoId: number,
    public foto: string) { 
        this.id = id;
        this.titulo = titulo;
        this.precio = precio;
        this.stock = stock;
        this.plataformaId = plataformaId;
        this.generoId = generoId;
        this.formatoId = formatoId;
        this.foto = foto;
    }
}