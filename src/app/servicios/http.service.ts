import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  URI = "https://utnfra-tssi-pss2-mundogamer.herokuapp.com" 

  if (process.env.NODE_ENV !== 'production') {
    URI = "http://localhost:8080"
  }
  URl = URI + /EcomerceJuegosTP/apirestTPFinal/apirestV6-JWT-MW-POO/ecomerce/"\;

  constructor(public http: HttpClient) { }
  extraerDatos(respuesta) {
    return respuesta || { };
  }
  manejadorError(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

  buscarJuego(plataforma,genero,formato,titulo,orden)
  { 
    const formData = new FormData();
    formData.append('plataforma',plataforma);
    formData.append('genero',genero);
    formData.append('formato',formato);
    formData.append('titulo',titulo);
    formData.append('orden',orden);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  traerJuego(juegoId)
  { 
    const formData = new FormData();
    formData.append('id',juegoId);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl+"getJuego",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  entregarJuego(juego:any,file: any)
  {
    //var param = {usuario:player.usuario,nombre:player.nombre,apellido:player.apellido,contrasenia:player.contrasenia,email:player.email};
    //var paramString = JSON.stringify(param);
    const formData = new FormData()
    formData.append('titulo',juego.titulo);
    formData.append('precio',juego.precio);
    formData.append('plataformaId',juego.plataformaId);
    formData.append('generoId',juego.generoId);
    formData.append('formatoId',juego.formatoId);
    formData.append('fotoNombre',juego.foto);
    formData.append('descripcion',juego.descripcion);
    formData.append('stock',juego.stock);
    formData.append('foto',file);

    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    
    return this.http.post(this.URl+"guardarJuego",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  actualizarJuego(juego:any,updateFoto: boolean,file: any)
  {
    //var param = {usuario:player.usuario,nombre:player.nombre,apellido:player.apellido,contrasenia:player.contrasenia,email:player.email};
    //var paramString = JSON.stringify(param);
    const formData = new FormData()
    debugger;
    formData.append('id',juego.id);
    formData.append('titulo',juego.titulo);
    formData.append('precio',juego.precio);
    formData.append('descripcion',juego.descripcion);
    formData.append('cambiarFoto',updateFoto?"Si":"No");
    formData.append('stock',juego.stock);
    formData.append('fotoNombre',juego.foto);
    formData.append('foto',file);

    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    
    return this.http.post(this.URl+"actualizarJuego",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  
  buscarUsuario(usuario:string,clave:string)
  { 
    const formData = new FormData()
    formData.append('usuario',usuario);
    formData.append('contrasenia',clave);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(this.URl+"login",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  traerEmpleados()
  { 
    const formData = new FormData();
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl+"listarEmpleados",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
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
    formData.append('estado',user.estado);

    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    
    return this.http.post(this.URl+"guardarCliente",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  habilitarEmpleado(id:string)
  {
    const formData = new FormData();
    formData.append('id',id);
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+"habilitar", formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  desabilitarEmpleado(id:string)
  {
    const formData = new FormData();
    formData.append('id',id);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+"desabilitar", formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  contratarEmpleado(id:string)
  {
    const formData = new FormData();
    formData.append('id',id);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+"contratar", formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
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
