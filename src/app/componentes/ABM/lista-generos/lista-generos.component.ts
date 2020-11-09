import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { JuegoService } from '../../../servicios/juego.service';
import { AltaAbmComponent } from '../../ABM/alta-abm/alta-abm.component';
import { MatDialog,MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: 'app-lista-generos',
  templateUrl: './lista-generos.component.html',
  styleUrls: ['./lista-generos.component.css']
})
export class ListaGenerosComponent implements OnInit {

  public lista: Array<any> = [];

  constructor(private juegoService: JuegoService,private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista(){
    this.juegoService.listarGenerosPromesa().then(
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

  AbrirAbm(genero:any){
    const dialogConfig = new MatDialogConfig();
    if(genero != null){
      dialogConfig.data = {
        titulo: "Actualizar Genero",
        descripcion: genero.descripcion,
        interes: "",
        precio: "",
        nuevo: false,
        id: genero.id,
        url:"actualizarGenero",
        tipoAbm: "GENERO", 
      };
    }
    else{
      dialogConfig.data = {
        titulo: "Crear Genero",
        descripcion: "",
        interes: "",
        precio: "",
        nuevo: true,
        url:"ingresarGenero",
        tipoAbm: "GENERO", 
      };
    }
    
    const dialogRef = this.dialog.open(AltaAbmComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(res => {
      this.cargarLista();
    })
  }
}
