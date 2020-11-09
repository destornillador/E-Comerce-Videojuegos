export class VentaJuego {
    
    constructor(public id: number, 
    public juegoId: number,
    public ventaId: number,
    public precio:number,
    public cantidad:number,
    public titulo: string,
    public stock: number,
    public plataforma: string,
    public formato: string,
    ) { 
        this.id = id;
        this.juegoId = juegoId;
        this.ventaId = ventaId;
        this.precio = precio;
        this.cantidad = cantidad;
        this.titulo = titulo;
        this.stock = stock;
        this.plataforma = plataforma;
        this.formato = formato;
    }
}