import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { UsuarioService } from '../../servicios/usuario.service';
import { VerificarService } from '../../servicios/verificar.service';

@Component({
  selector: 'app-abm-empleados',
  templateUrl: './abm-empleados.component.html',
  styleUrls: ['./abm-empleados.component.css']
})
export class AbmEmpleadosComponent implements OnInit {

  TIPO:string="";
  public listadoParaCompartir: Array<any>;

  constructor(public usuarioService: UsuarioService,public verificarService: VerificarService,public router:Router) { }

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
    this.usuarioService.traerEmpleados().then(
      (empleados) =>{
        this.listadoParaCompartir = empleados;
      }
    );    
  }
  ActualizarLista(event2: any) {
    this.usuarioService.traerEmpleados().then(
      (empleados) =>{
        this.listadoParaCompartir = empleados;
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
