import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { VentaService } from '../../servicios/venta.service';
import { VerificarService } from '../../servicios/verificar.service';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent implements OnInit {

  TIPO:string="";
  usuarioId:string="";
  public listaCompras: Array<any> = [];

  constructor(public ventaService: VentaService,private router: Router,public verificarService: VerificarService) { }

  ngOnInit(): void {
    let tokenjs = localStorage.getItem("Token");
    let token:any = tokenjs!=null?JSON.parse(tokenjs):null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        if(datos.respuesta){
          this.TIPO = datos.respuesta.tipoUsuarioId;
          if(datos.respuesta.tipoUsuarioId == "2")
            this.usuarioId = datos.respuesta.id;
        }
        else
          this.TIPO = "0";

        this.cargarLista();
      }
    );
  }

  verDatos(compra){
    const queryParams: any = {};
    queryParams.venta = JSON.stringify(compra);
    let navigationExtras: NavigationExtras = { queryParams };
    this.router.navigate(['/VentaDatos'],navigationExtras);
  }
  cargarLista(){
    this.ventaService.listarVentasPromesa(this.usuarioId,"").then(
      (datos) => {
        this.listaCompras = datos;
      }
    );
  }
  AbrirModal(event: any) {
    if(event == 0){
      localStorage.clear();
      this.router.navigate(['/Principal']);
    }
  }
}
