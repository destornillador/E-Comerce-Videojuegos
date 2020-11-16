import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { MatDialog,MatDialogConfig } from "@angular/material/dialog";

import { JuegoService } from '../../servicios/juego.service';
import { VerificarService } from '../../servicios/verificar.service';

import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';
import { AltaJuegoComponent } from '../alta-juego/alta-juego.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  TIPO:string="";
  estado: string="";
  public juegos: any[];
  public generos = [];
  public formatos = [];
  public plataformas = [];
  public formato: string = "";
  public genero: string = "";
  public plataforma: string = "";
  public orden: string = "";
  public titulo: string = "";
  constructor(public juegoService : JuegoService,public verificarService :VerificarService,public dialog: MatDialog,public router:Router) { }

  ngOnInit() {
    let tokenjs = localStorage.getItem("Token");
    let token:any = tokenjs!=null?JSON.parse(tokenjs):null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        if(datos.respuesta){
          this.TIPO = datos.respuesta.tipoUsuarioId;
          this.estado = datos.respuesta.estado;
        }
        else{
          this.TIPO = "0";
          this.estado = "0";
        }
      }
    );
    this.cargarCombos();
    this.buscar();
  }

  cargarCombos(){
    this.juegoService.listarFormatosPromesa()
    .then((datos) => {
        this.formatos.push({id:"",descripcion:"Todos"});
        datos.forEach(elemt => this.formatos.push(elemt))
      })
      .catch(
      (noSeEncontroUsuario) => { alert("Error en el sistema"); }
      );
    this.juegoService.listarGenerosPromesa()
    .then((datos) => {
        this.generos.push({id:"",descripcion:"Todos"});
        datos.forEach(elemt => this.generos.push(elemt))
      })
      .catch(
      (noSeEncontroUsuario) => { alert("Error en el sistema"); }
      );
    this.juegoService.listarPlataformasPromesa()
    .then((datos) => {
        this.plataformas.push({id:"",descripcion:"Todos"});
        datos.forEach(elemt => this.plataformas.push(elemt))
      })
      .catch(
      (noSeEncontroUsuario) => { alert("Error en el sistema"); }
      );
  }
  buscar(){
    this.juegoService.listarJuegosPromesa(this.plataforma,this.genero,this.formato,this.titulo,this.orden).then(
      (datos) => {
        this.juegos = datos;
      }
    );
  }

  Ir(id:string){
    this.router.navigateByUrl("Juego/"+id);
  }

  AbrirModal(event: any) {
    if(event == 1){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = "Registro de usuario";
      
      
      const dialogRef = this.dialog.open(RegistroComponent, dialogConfig);
      
      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
      })
    }
    if(event == 2){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = "Inicio de sesion";
      
      
      const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
      
      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
      })
    }
    if(event == 0){
      localStorage.clear();
      window.location.reload();
    }
  }

  AgregarJuego(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      titulo:"Registro de juego",
      juegoNuevo: true,
    };
    
    const dialogRef = this.dialog.open(AltaJuegoComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }

}
