import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { VentaService } from '../../servicios/venta.service';
import { VerificarService } from '../../servicios/verificar.service';

@Component({
  selector: 'app-datos-venta',
  templateUrl: './datos-venta.component.html',
  styleUrls: ['./datos-venta.component.css']
})
export class DatosVentaComponent implements OnInit {

  TIPO:string="";
  listaArticulos: Array<any> = [];
  venta:any;
  constructor(public ventaService: VentaService,private route: ActivatedRoute,private router: Router,public verificarService: VerificarService) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.venta = JSON.parse(params['venta']);
    });
    let tokenjs = localStorage.getItem("Token");
    let token:any = tokenjs!=null?JSON.parse(tokenjs):null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        if(datos.respuesta){
          this.TIPO = datos.respuesta.tipoUsuarioId;
        }
        this.cargarArticulos();
      }
    );
  }

  cargarArticulos(){
    this.ventaService.listarArticulosPromesa(this.venta.id).then(
      (datos) => {
        this.listaArticulos = datos;
      }
    );
  }

  pasarEstado(){
    this.ventaService.pasarEstadoVenta(this.venta.id,this.venta.tipoRetiroId,this.venta.tarjeta,this.venta.estado).then(
      (resultado: any) => {
        if(!resultado.exito){
          for(var i=0;i< this.listaArticulos.length;i++){
            this.ventaService.reintegrarStock(this.listaArticulos[i].juegoId, this.listaArticulos[i].cantidad + this.listaArticulos[i].stock);
          }
        }
        alert(resultado.mensaje);
        this.router.navigate(['/ListaCompras']);
      }
    );
  }
}
