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
        debugger;
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
      this.miHttp.buscarUsuario("traer", usuario, clave)
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
            datos[0].tipoUsuarioId)
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
}
