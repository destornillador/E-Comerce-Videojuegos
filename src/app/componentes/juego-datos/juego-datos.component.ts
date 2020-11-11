import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MatDialog,MatDialogConfig } from "@angular/material/dialog";

import { JuegoService } from '../../servicios/juego.service';
import { VerificarService } from '../../servicios/verificar.service';

import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';
import { AltaJuegoComponent } from '../alta-juego/alta-juego.component';

@Component({
  selector: 'app-juego-datos',
  templateUrl: './juego-datos.component.html',
  styleUrls: ['./juego-datos.component.css']
})
export class JuegoDatosComponent implements OnInit {

  TIPO:string="";
  public listadoParaCompartir: Array<any>;
  public juego: any;
  constructor(public JuegoService : JuegoService,public verificarService: VerificarService,public dialog: MatDialog,
  public route:ActivatedRoute,public router:Router) {

   }

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
    const juegoId = this.route.snapshot.paramMap.get('id');
    this.JuegoService.obtenerJuego(juegoId).then(
      (datos) => {
        this.juego = datos;  
      }
    );
  }

  AgregarJuego() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      titulo:"Actualizar datos",
      juegoNuevo: false,
      juegoActualizar: this.juego, 
    };
    
    const dialogRef = this.dialog.open(AltaJuegoComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }
  
  AgregarCarrito(){
    var carrito = localStorage.getItem('Carrito');
    if(carrito != null){
      var juegosCarrito = JSON.parse(carrito);
      for(var i = 0; i < juegosCarrito.length; i++){
        if(juegosCarrito[i] == this.juego.id){
          alert("Este articulo ya fue agregado");
          return;
        }
      }
      juegosCarrito.push(this.juego.id);
      localStorage.setItem("Carrito", JSON.stringify(juegosCarrito));
      alert("Agregado al carrito");
      this.router.navigate(['/']);
    }
    else{
      localStorage.setItem("Carrito", JSON.stringify([this.juego.id]));
      alert("Agregado al carrito");
      this.router.navigate(['/']);
    }
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
      this.router.navigate(['/']);
    }
  }
}
