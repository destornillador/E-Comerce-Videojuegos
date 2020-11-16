import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Usuario } from '../clases/usuario';
import { TipoUsuario } from '../clases/TipoUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public miHttp: HttpService) { }

  RegistrarCliente(usuario: Usuario): Promise<boolean> {
    
    let result: Promise<boolean> = this.miHttp.entregarCliente(usuario)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }

  BuscarUsuario(usuario: string, clave: string): Promise<Usuario> {
    let promesa: Promise<Usuario> = new Promise((resolve, reject) => {
      this.miHttp.buscarUsuario(usuario, clave)
        .then(datos => {
          if (datos.length > 0) {
            let usuario = new Usuario(
            datos[0].id, 
            datos[0].usuario, 
            datos[0].contrasenia, 
            datos[0].nombre, 
            datos[0].apellido, 
            datos[0].sexo, 
            datos[0].email, 
            datos[0].telefono,
            datos[0].fechaNacimiento,
            datos[0].tipoUsuarioId,
            datos[0].estado)
            resolve(usuario);
          }
          else {
            resolve(null);
          }
        })
        .catch(error => { console.log(error) });
    });
    return promesa;
  }
  public verificar(usuario):Promise<any>
  {
    let result: Promise<string> = this.miHttp.verificarUsuario(usuario)
      .then(datos => {
        return datos.respuesta;
      })
      .catch(error => {
        console.log(error);
        return "Error en el servicio";
      });
    return result;
  }
  public traerEmpleados(): Promise<Array<Usuario>> {
    let promesa: Promise<Array<Usuario>> = new Promise((resolve, reject) => {
      this.miHttp.traerEmpleados()
        .then(datos => {
          console.log(datos);
          let miArray: Array<Usuario> = new Array<Usuario>();
          for (let unDato of datos) {
            miArray.push(new Usuario(unDato.id, unDato.usuario, unDato.contrasenia, unDato.nombre,unDato.apellido,
            unDato.sexo,unDato.email,unDato.telefono,unDato.fechaNacimiento,unDato.tipoUsuarioId,unDato.estado));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    });
    return promesa;
  }
  HabilitarEmpleado(id:string):Promise<boolean>
  {
    let result: Promise<boolean> = this.miHttp.habilitarEmpleado(id)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  DesabilitarEmpleado(id:string):Promise<boolean>
  {
    let result: Promise<boolean> = this.miHttp.desabilitarEmpleado(id)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  ContratarEmpleado(id:string):Promise<boolean>
  {
    let result: Promise<boolean> = this.miHttp.contratarEmpleado(id)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
}
