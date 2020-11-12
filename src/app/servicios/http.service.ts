import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }

  extraerDatos(respuesta) {
    return respuesta || { };
  }
  manejadorError(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

  buscarGeneros()
  { 
    const formData = new FormData();
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(environment.server_url+"listarGeneros",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  buscarPlataformas()
  { 
    const formData = new FormData();
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(environment.server_url+"listarPlataformas",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  buscarFormatos()
  { 
    const formData = new FormData();
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(environment.server_url+"listarFormatos",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  buscarZonas()
  { 
    const formData = new FormData();
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(environment.server_url+"listarZonas",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  buscarTiposRetiro()
  { 
    const formData = new FormData();
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(environment.server_url+"listarTipoRetiros",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  buscarFormasPago()
  { 
    const formData = new FormData();
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(environment.server_url+"listarFormaPagos",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  buscarCuotas()
  { 
    const formData = new FormData();
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(environment.server_url+"listarCuotas",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
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
    return this.http.post(environment.server_url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  traerCarrito(ids){
    const formData = new FormData();
    formData.append('ids',ids);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(environment.server_url+"traerCarrito",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  traerJuego(juegoId)
  { 
    const formData = new FormData();
    formData.append('id',juegoId);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(environment.server_url+"getJuego",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
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
    formData.append('descripcion',juego.descripcion);
    formData.append('stock',juego.stock);
    formData.append('foto',file);

    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    
    return this.http.post(environment.server_url+"guardarJuego",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  actualizarJuego(juego:any,updateFoto: boolean,file: any)
  {
    //var param = {usuario:player.usuario,nombre:player.nombre,apellido:player.apellido,contrasenia:player.contrasenia,email:player.email};
    //var paramString = JSON.stringify(param);
    const formData = new FormData()
    
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
    
    return this.http.post(environment.server_url+"actualizarJuego",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  
  buscarUsuario(usuario:string,clave:string)
  { 
    const formData = new FormData()
    formData.append('usuario',usuario);
    formData.append('contrasenia',clave);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(environment.server_url+"login",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  traerEmpleados()
  { 
    const formData = new FormData();
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(environment.server_url+"listarEmpleados",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
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
    
    return this.http.post(environment.server_url+"guardarCliente",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  habilitarEmpleado(id:string)
  {
    const formData = new FormData();
    formData.append('id',id);
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(environment.server_url+"habilitar", formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  desabilitarEmpleado(id:string)
  {
    const formData = new FormData();
    formData.append('id',id);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(environment.server_url+"desabilitar", formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  contratarEmpleado(id:string)
  {
    const formData = new FormData();
    formData.append('id',id);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(environment.server_url+"contratar", formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  traerVentas(usuarioId,estado){
    const formData = new FormData();
    formData.append('usuarioId',usuarioId);
    formData.append('estado',estado);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(environment.server_url+"TraerVentas",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  traerArticulos(ventaId){
    const formData = new FormData();
    formData.append('ventaId',ventaId);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(environment.server_url+"TraerVentaJuegos",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  crearVenta(venta:any)
  {
    const formData = new FormData()
    formData.append('usuarioId',venta.usuarioId);
    formData.append('precioTotal',venta.precioTotal);
    formData.append('tipoRetiroId',venta.tipoRetiroId);
    formData.append('zonaId',venta.zonaId);
    formData.append('domicilio',venta.domicilio);
    formData.append('formaPagoId',venta.formaPagoId);
    formData.append('cuotas',venta.cuotaId);
    formData.append('estado',venta.estado);
    formData.append('fecha',venta.fecha);
    formData.append('tarjeta',venta.tarjeta);

    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    
    return this.http.post(environment.server_url+"guardarVenta",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  crearVentaJuego(ventaJuego:any,nuevoStock:string)
  {
    const formData = new FormData()
    formData.append('juegoId',ventaJuego.juegoId);
    formData.append('ventaId',ventaJuego.ventaId);
    formData.append('precio',ventaJuego.precio);
    formData.append('cantidad',ventaJuego.cantidad);
    formData.append('nuevoStock',nuevoStock);   

    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    
    return this.http.post(environment.server_url+"guardarVentaJuego",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  pasarEstado(ventaId,tipoRetiroId,tarjeta,estado){
    const formData = new FormData()
    formData.append('ventaId',ventaId);
    formData.append('tipoRetiroId',tipoRetiroId);
    formData.append('tarjeta',tarjeta);
    formData.append('estado',estado);
  
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    
    return this.http.post(environment.server_url+"pasarEstado",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  reintegrarStock(juegoId,nuevoStock){
    const formData = new FormData()
    formData.append('juegoId',juegoId);
    formData.append('nuevoStock',nuevoStock);   
  
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    
    return this.http.post(environment.server_url+"regresarVentaJuego",formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  crearToken(datos:any)
  { 
    const formData = new FormData()
    formData.append('id',datos.id);
    formData.append('usuario',datos.usuario);
    formData.append('nombre',datos.nombre);
    formData.append('apellido',datos.apellido);
    formData.append('tipoUsuarioId',datos.tipoUsuarioId);
    formData.append('email',datos.email);
    formData.append('telefono',datos.telefono);
    //var param = {usuario:datos.nombre,clave:datos.contrasenia};
    //var paramString = JSON.stringify(param);
    
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(environment.server_url+"CrearToken", formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  verificarToken(token:any)
  { 
    const formData = new FormData()
    formData.append('Token',token);
    
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(environment.server_url+"VerificarToken", formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  recuperarToken(token:any)
  {
    const formData = new FormData()
    formData.append('Token',token);
    
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(environment.server_url+"RecuperarToken", formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  altaAbm(data:any){
    
    const formData = new FormData()
    formData.append('id',data.id);
    formData.append('descripcion',data.descripcion);
    formData.append('precio',data.precio);
    formData.append('numero',data.numero);
    formData.append('interes',data.interes);

    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    
    return this.http.post(environment.server_url+data.url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
}