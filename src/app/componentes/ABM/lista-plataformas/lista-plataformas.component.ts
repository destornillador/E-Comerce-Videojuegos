import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { JuegoService } from '../../../servicios/juego.service';
import { AltaAbmComponent } from '../../ABM/alta-abm/alta-abm.component';
import { MatDialog,MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: 'app-lista-plataformas',
  templateUrl: './lista-plataformas.component.html',
  styleUrls: ['./lista-plataformas.component.css']
})
export class ListaPlataformasComponent implements OnInit {

  public lista: Array<any> = [];
  
  constructor(private juegoService: JuegoService,private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista(){
    this.juegoService.listarPlataformasPromesa().then(
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
  AbrirAbm(plataforma:any){
    const dialogConfig = new MatDialogConfig();
    if(plataforma != null){
      dialogConfig.data = {
        titulo: "Actualizar Plataforma",
        descripcion: plataforma.descripcion,
        interes: "",
        precio: "",
        nuevo: false,
        id: plataforma.id,
        url: "actualizarPlataforma",
        tipoAbm: "PLATAFORMA", 
      };
    }
    else{
      dialogConfig.data = {
        titulo: "Crear Plataforma",
        descripcion: "",
        interes: "",
        precio: "",
        nuevo: true,
        url: "ingresarPlataforma",
        tipoAbm: "PLATAFORMA", 
      };
    }
    const dialogRef = this.dialog.open(AltaAbmComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(res => {
      this.cargarLista();
    })
  }
}
