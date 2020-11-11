import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Venta } from '../../clases/venta';
import { VentaJuego } from '../../clases/ventaJuego';
import { VentaService } from '../../servicios/venta.service'
import { VerificarService } from '../../servicios/verificar.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-confirmar-compra',
  templateUrl: './confirmar-compra.component.html',
  styleUrls: ['./confirmar-compra.component.css']
})
export class ConfirmarCompraComponent implements OnInit {

  public idUsuario:number;
  
  constructor(public dialogref: MatDialogRef<ConfirmarCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ventaService: VentaService,
    public verificarService: VerificarService,
    public router:Router) { }

  ngOnInit(): void {
    let tokenjs = localStorage.getItem("Token");
    let token:any = tokenjs!=null?JSON.parse(tokenjs):null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        if(datos.respuesta){
          this.idUsuario = datos.respuesta.id;
        }
      }
    );
    console.log(this.data);
  }

  confirmar(){
    debugger;
    var today = new Date();
    var dd = String(today. getDate()). padStart(2, '0');
    var mm = String(today. getMonth() + 1). padStart(2, '0'); //January is 0!
    var yyyy = today. getFullYear();
    var fecha = yyyy+"-"+mm+"-"+dd;
    var envioId = this.data.envio != null ? this.data.envio.id : null;
    var cuotaId = this.data.cuota != null ? this.data.cuota.id : null;
    var venta = new Venta(0,this.idUsuario,"","","",0,this.data.total,this.data.retiro.id,"",envioId,"",this.data.domicilio,
    this.data.pago.id,"",cuotaId,0,0,1,"",fecha,this.data.tarjeta);

    this.ventaService.entregarVenta(venta).then(
      (datos) => {
        for(var i = 0;i< this.data.lista.length;i++){
          var nuevoStock = this.data.lista[i].stock - this.data.lista[i].cantidad;
          var ventaJuego = new VentaJuego(0,this.data.lista[i].id,datos,this.data.lista[i].precio,this.data.lista[i].cantidad,"",1,"","");
          this.ventaService.entregarVentaJuego(ventaJuego,nuevoStock).then();
        }
        localStorage.removeItem("Carrito");
        alert("Compra Realizada, sigala en el listado con este id: "+datos);
        this.router.navigate(['/']);
        this.dialogref.close();
      }
    );
  }
  cancelar(){
    this.dialogref.close();
  }
}
