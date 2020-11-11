import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { VentaService } from '../../../servicios/venta.service';
import { AltaAbmComponent } from '../../ABM/alta-abm/alta-abm.component';
import { MatDialog,MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: 'app-lista-zonas',
  templateUrl: './lista-zonas.component.html',
  styleUrls: ['./lista-zonas.component.css']
})
export class ListaZonasComponent implements OnInit {

  public lista: Array<any> = [];
  
  constructor(private ventaService: VentaService,private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista(){
    this.ventaService.listarZonasPromesa().then(
      (datos) => {
        this.lista = datos;
      }
    );
  }

  AbrirModal(event: any) {
    if(event == 0){
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }

  AbrirAbm(zona:any){
    const dialogConfig = new MatDialogConfig();
    if(zona != null){
      dialogConfig.data = {
        titulo: "Actualizar zona de envio",
        descripcion: zona.descripcion,
        interes: "",
        precio: zona.precio,
        nuevo: false,
        id: zona.id,
        url: "actualizarZona",
        tipoAbm: "ZONA", 
      };
    }
    else{
      dialogConfig.data = {
        titulo: "Crear zona de envio",
        descripcion: "",
        interes: "",
        precio: "",
        nuevo: true,
        url: "ingresarZona",
        tipoAbm: "ZONA", 
      };
    }
    const dialogRef = this.dialog.open(AltaAbmComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(res => {
      this.cargarLista();
    })
  }
}
