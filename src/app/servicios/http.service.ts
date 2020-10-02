import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  URl = "http://localhost:8080/EcomerceJuegosTP/apirestTPFinal/apirestV6-JWT-MW-POO/ecomerce/";
  
  constructor(public http: HttpClient) { }
  extraerDatos(respuesta) {
    return respuesta || { };
  }
  manejadorError(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

  buscarJuego(plataforma,genero,formato)
  { 
    const formData = new FormData();
    formData.append('plataforma',plataforma);
    formData.append('genero',genero);
    formData.append('formato',formato);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  buscarUsuario(url:string,usuario:string,clave:string)
  { 
    const formData = new FormData()
    formData.append('usuario',usuario);
    formData.append('contrasenia',clave);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(this.URl+"login",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  entregarCliente(user:any)
  {
    //var param = {usuario:player.usuario,nombre:player.nombre,apellido:player.apellido,contrasenia:player.contrasenia,email:player.email};
    //var paramString = JSON.stringify(param);
    const formData = new FormData()
    formData.append('usuario',user.usuario);
    formData.append('apellido',user.apellido);
    formData.append('nombre',user.nombre);
    formData.append('sexo',user.sexo);
    formData.append('contrasenia',user.contrasenia);
    formData.append('tipoUsuarioId',user.tipoUsuarioId);
    formData.append('telefono',user.telefono);
    formData.append('email',user.email);
    formData.append('fechaNacimiento',user.fechaNacimiento);

    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    
    return this.http.post(this.URl+"guardarCliente",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }


  crearToken(datos:any)
  { 
    const formData = new FormData()
    formData.append('usuario',datos.usuario);
    formData.append('nombre',datos.nombre);
    formData.append('apellido',datos.apellido);
    formData.append('tipoUsuarioId',datos.tipoUsuarioId);
    //var param = {usuario:datos.nombre,clave:datos.contrasenia};
    //var paramString = JSON.stringify(param);
    
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+"CrearToken", formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  verificarToken(token:any)
  { 
    const formData = new FormData()
    formData.append('Token',token);
    
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+"VerificarToken", formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  recuperarToken(token:any)
  {
    const formData = new FormData()
    formData.append('Token',token);
    
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+"RecuperarToken", formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
}
