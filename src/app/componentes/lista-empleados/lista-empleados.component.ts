import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  @Output() cambio: EventEmitter<any>= new EventEmitter<any>();  
  @Input()

  public listaEmpleados: Array<Usuario> = [];

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  Habilitar(id: string) { 
    this.usuarioService.HabilitarEmpleado(id).then((datos) =>{
      if(datos)
      {
        this.cambio.emit();
      }
    })
  }
  Contratar(id: string) { 
    this.usuarioService.ContratarEmpleado(id).then((datos) =>{
      if(datos)
      {
        this.cambio.emit();
      }
    })
  }
  Desabilitar(id: string) {
    this.usuarioService.DesabilitarEmpleado(id).then((datos) =>{
      if(datos)
      {
        this.cambio.emit();
      }
    })
   }
}
