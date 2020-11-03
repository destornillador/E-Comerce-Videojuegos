import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Zona } from '../clases/zona';
import { TipoRetiro } from '../clases/tipoRetiro';
import { FormaPago } from '../clases/formaPago';
import { Cuota } from '../clases/cuota';
import { Venta } from '../clases/venta';
import { VentaJuego } from '../clases/ventaJuego';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(public miHttp: HttpService) { }

  public entregarVenta(venta: Venta){
    let result: Promise<number> = this.miHttp.crearVenta(venta)
      .then(datos => {
        debugger;
        if(datos.respuesta != null)
          return datos.respuesta;
        else
          return false;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  public entregarVentaJuego(venta: VentaJuego,nuevoStock: any){
    let result: Promise<number> = this.miHttp.crearVentaJuego(venta,nuevoStock)
      .then(datos => {
        if(datos.respuesta != null)
          return datos.respuesta;
        else
          return false;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  public pasarEstadoVenta(ventaId,tipoRetiroId,tarjeta,estado):Promise<string>
  {
    let result: Promise<string> = this.miHttp.pasarEstado(ventaId,tipoRetiroId,tarjeta,estado)
      .then(datos => {
        return datos.respuesta;
      })
      .catch(error => {
        console.log(error);
        return "Error en el servicio";
      });
    return result;
  }

  public listarVentasPromesa(idusuario,estado): Promise<Array<Venta>> {
    let promesa: Promise<Array<Venta>> = new Promise((resolve, reject) => {
      this.miHttp.traerVentas(idusuario,estado)
        .then(datos => {
          console.log(datos);
          let miArray: Array<Venta> = new Array<Venta>();
          for (let unDato of datos) {
            miArray.push(new Venta(unDato.id,unDato.usuarioId,unDato.nombre,unDato.apellido,unDato.email,unDato.telefono,unDato.precioTotal,
            unDato.tipoRetiroId,unDato.tipoRetiro,unDato.zonaId,unDato.zona,unDato.domicilio,unDato.formaPagoId,unDato.formaPago,unDato.cuotaId,
            unDato.cuotaNumero,unDato.interes,unDato.estado,unDato.descripcionEstado,unDato.fecha,unDato.tarjeta));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  public listarArticulosPromesa(idVenta): Promise<Array<VentaJuego>> {
    let promesa: Promise<Array<VentaJuego>> = new Promise((resolve, reject) => {
      this.miHttp.traerArticulos(idVenta)
        .then(datos => {
          console.log(datos);
          let miArray: Array<VentaJuego> = new Array<VentaJuego>();
          for (let unDato of datos) {
            miArray.push(new VentaJuego(unDato.id,unDato.juegoId,unDato.ventaId,unDato.precio,unDato.cantidad,unDato.juegoTitulo,0,
            unDato.juegoPlataforma,unDato.juegoFormato));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }

  public listarZonasPromesa(): Promise<Array<Zona>> {
    let promesa: Promise<Array<Zona>> = new Promise((resolve, reject) => {
      this.miHttp.buscarZonas()
        .then(datos => {
          console.log(datos);
          let miArray: Array<Zona> = new Array<Zona>();
          for (let unDato of datos) {
            miArray.push(new Zona(unDato.id,unDato.descripcion,unDato.precio));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  public listarTiposRetiroPromesa(): Promise<Array<TipoRetiro>> {
    let promesa: Promise<Array<TipoRetiro>> = new Promise((resolve, reject) => {
      this.miHttp.buscarTiposRetiro()
        .then(datos => {
          console.log(datos);
          let miArray: Array<TipoRetiro> = new Array<TipoRetiro>();
          for (let unDato of datos) {
            miArray.push(new TipoRetiro(unDato.id,unDato.descripcion));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  public listarFormasPagoPromesa(): Promise<Array<FormaPago>> {
    let promesa: Promise<Array<FormaPago>> = new Promise((resolve, reject) => {
      this.miHttp.buscarFormasPago()
        .then(datos => {
          console.log(datos);
          let miArray: Array<FormaPago> = new Array<FormaPago>();
          for (let unDato of datos) {
            miArray.push(new FormaPago(unDato.id,unDato.descripcion));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  public listarCuotasPromesa(): Promise<Array<Cuota>> {
    let promesa: Promise<Array<Cuota>> = new Promise((resolve, reject) => {
      this.miHttp.buscarCuotas()
        .then(datos => {
          console.log(datos);
          let miArray: Array<Cuota> = new Array<Cuota>();
          for (let unDato of datos) {
            miArray.push(new Cuota(unDato.id,unDato.numero,unDato.interes));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
}
