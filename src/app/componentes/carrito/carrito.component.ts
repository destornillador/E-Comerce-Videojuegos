import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { JuegoService } from '../../servicios/juego.service';
import { VerificarService } from '../../servicios/verificar.service';
import { VentaJuego} from "../../clases/ventaJuego";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  TIPO:string="";
  total:number = 0;
  public listadoParaCompartir: Array<VentaJuego> = [];

  constructor(public juegoService : JuegoService,public verificarService: VerificarService,
  public router:Router) { }

  ngOnInit(): void {
    let tokenjs = localStorage.getItem("Token");
    let token:any = tokenjs!=null?JSON.parse(tokenjs):null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        if(datos.respuesta)
          this.TIPO = datos.respuesta.tipoUsuarioId;
        else
          this.TIPO = "0";
      }
    );
    let carritojs = localStorage.getItem("Carrito");
    let carrito:any = carritojs!=null?JSON.parse(carritojs):null;
    this.juegoService.listarCarritoPromesa(carrito).then(
      (datos) => {
        this.listadoParaCompartir = datos;
        this.ajustarTotal();
      }
    );

  }
  Quitar(juegoId){
    let carritojs = localStorage.getItem("Carrito");
    let carrito:any = carritojs!=null?JSON.parse(carritojs):null;
    const index = carrito.indexOf(juegoId, 0);
    if (index > -1) {
      carrito.splice(index, 1);
    }
    localStorage.setItem("Carrito", JSON.stringify(carrito));
    if(carrito.length == 0){
      this.listadoParaCompartir = [];
      this.total = 0;
    }
    else
      this.juegoService.listarCarritoPromesa(carrito).then(
        (datos) => {
          this.listadoParaCompartir = datos;
          this.ajustarTotal();
        }
      );
  }
  ModificarCantidad(carrito,valor){
    if(valor == 1){
      if(carrito.cantidad > 1){
        carrito.cantidad--;
        this.ajustarTotal();
      }
    }
    if(valor == 2){
      if(carrito.cantidad < carrito.stock){
        carrito.cantidad++;
        this.ajustarTotal();
      }
      else{
        alert("Alcanzo el limite de stock");
      }
    }
  }
  FinalizarCompra(){
    const queryParams: any = {};
    queryParams.listaCarrito = JSON.stringify(this.listadoParaCompartir);
    let navigationExtras: NavigationExtras = { queryParams };
    this.router.navigate(['/FinalizarCompra'],navigationExtras);
  }

  ajustarTotal(){
    this.total = 0;
    for(var i=0;i < this.listadoParaCompartir.length;i++){
      this.total += this.listadoParaCompartir[i].precio * this.listadoParaCompartir[i].cantidad;
    }
  }

  AbrirModal(event: any) {
    if(event == 0){
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }

}
