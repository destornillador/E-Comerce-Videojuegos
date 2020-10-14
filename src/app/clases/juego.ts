export class Juego {
    
    constructor(public id: number, 
    public titulo: string,
    public precio:number,
    public plataformaId: number,
    public generoId: number,
    public formatoId: number,
    public stock: number,
    public plataforma: string,
    public genero: string,
    public formato: string,
    public foto: string,
    public descripcion: string) { 
        this.id = id;
        this.titulo = titulo;
        this.precio = precio;
        this.plataformaId = plataformaId;
        this.generoId = generoId;
        this.formatoId = formatoId;
        this.stock = stock;
        this.plataforma = plataforma;
        this.genero = genero;
        this.formato = formato;
        this.foto = foto;
        this.descripcion = descripcion;
    }
}