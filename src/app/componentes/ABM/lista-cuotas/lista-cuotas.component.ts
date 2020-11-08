import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { VentaService } from '../../../servicios/venta.service';
import { AltaAbmComponent } from '../../ABM/alta-abm/alta-abm.component';
import { MatDialog,MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: 'app-lista-cuotas',
  templateUrl: './lista-cuotas.component.html',
  styleUrls: ['./lista-cuotas.component.css']
})
export class ListaCuotasComponent implements OnInit {

  public lista: Array<any> = [];
  
  constructor(private ventaService: VentaService,private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista(){
    this.ventaService.listarCuotasPromesa().then(
      (datos) => {
        this.lista = datos;
      }
    );
  }

  AbrirModal(event: any) {
    if(event == 0){
      localStorage.clear();
      this.router.navigate(['/Principal']);
    }
  }
  AbrirAbm(cuota:any){
    const dialogConfig = new MatDialogConfig();
    if(cuota != null){
      dialogConfig.data = {
        titulo: "Actualizar Cuota",
        numero: cuota.numero,
        interes: cuota.interes,
        precio: "",
        nuevo: false,
        id: cuota.id,
        url: "actualizarCuota",
        tipoAbm: "CUOTA", 
      };
    }
    else{
      dialogConfig.data = {
        titulo: "Crear Cuota",
        numero: "",
        interes: "",
        precio: "",
        nuevo: true,
        url: "ingresarCuota",
        tipoAbm: "CUOTA", 
      };
    }
    const dialogRef = this.dialog.open(AltaAbmComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(res => {
      this.cargarLista();
    })
  }
}
