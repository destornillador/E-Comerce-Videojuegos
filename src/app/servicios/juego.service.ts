import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Juego } from '../clases/juego';
import { VentaJuego } from '../clases/ventaJuego';
import { Genero } from '../clases/genero';
import { Formato } from '../clases/formato';
import { Plataforma } from '../clases/plataforma';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor(public miHttp: HttpService) { }
  public listarJuegosPromesa(plataforma,genero,formato,titulo,orden): Promise<Array<Juego>> {
    let promesa: Promise<Array<Juego>> = new Promise((resolve, reject) => {
      this.miHttp.buscarJuego(plataforma,genero,formato,titulo,orden)
        .then(datos => {
          console.log(datos);
          let miArray: Array<Juego> = new Array<Juego>();
          for (let unDato of datos) {
            miArray.push(new Juego(unDato.id, unDato.titulo, unDato.precio, unDato.plataformaId,unDato.generoId,unDato.formatoId,unDato.stock,
            unDato.plataforma,unDato.genero,unDato.formato,unDato.foto,unDato.descripcion));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  public listarCarritoPromesa(ids): Promise<Array<VentaJuego>> {
    let promesa: Promise<Array<VentaJuego>> = new Promise((resolve, reject) => {
      this.miHttp.traerCarrito(ids)
        .then(datos => {
          console.log(datos);
          let miArray: Array<VentaJuego> = new Array<VentaJuego>();
          for (let unDato of datos) {
            miArray.push(new VentaJuego(unDato.id,0,0,unDato.precio,1, unDato.titulo,unDato.stock,
            unDato.plataforma,unDato.formato));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  public obtenerJuego(juegoId): Promise<Juego> {
    let promesa: Promise<Juego> = new Promise((resolve, reject) => {
      this.miHttp.traerJuego(juegoId)
        .then(datos => {
          console.log(datos);
          let juego: Juego = new Juego(datos[0].id, datos[0].titulo, datos[0].precio, datos[0].plataformaId,datos[0].generoId,datos[0].formatoId,datos[0].stock,
            datos[0].plataforma,datos[0].genero,datos[0].formato,datos[0].foto,datos[0].descripcion);
          
          resolve(juego);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  
  public RegistrarJuego(juego: Juego,file: any): Promise<boolean> {
    
    let result: Promise<boolean> = this.miHttp.entregarJuego(juego,file)
      .then(datos => {
        debugger;
        if(datos.respuesta != null)
          return true;
        else
          return false;
      })
      .catch(error => {
        debugger;
        console.log(error);
        return false;
      });
    return result;
  }
  public ActualizarJuego(juego: Juego,updateFoto: boolean,file: any): Promise<boolean> {
    
    let result: Promise<boolean> = this.miHttp.actualizarJuego(juego,updateFoto,file)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  
  public listarGenerosPromesa(): Promise<Array<Genero>> {
    let promesa: Promise<Array<Genero>> = new Promise((resolve, reject) => {
      this.miHttp.buscarGeneros()
        .then(datos => {
          console.log(datos);
          let miArray: Array<Genero> = new Array<Genero>();
          for (let unDato of datos) {
            miArray.push(new Genero(unDato.id,unDato.descripcion));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  public listarPlataformasPromesa(): Promise<Array<Plataforma>> {
    let promesa: Promise<Array<Plataforma>> = new Promise((resolve, reject) => {
      this.miHttp.buscarPlataformas()
        .then(datos => {
          console.log(datos);
          let miArray: Array<Plataforma> = new Array<Plataforma>();
          for (let unDato of datos) {
            miArray.push(new Plataforma(unDato.id,unDato.descripcion));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  public listarFormatosPromesa(): Promise<Array<Formato>> {
    let promesa: Promise<Array<Formato>> = new Promise((resolve, reject) => {
      this.miHttp.buscarFormatos()
        .then(datos => {
          console.log(datos);
          let miArray: Array<Formato> = new Array<Formato>();
          for (let unDato of datos) {
            miArray.push(new Formato(unDato.id,unDato.descripcion));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
}
