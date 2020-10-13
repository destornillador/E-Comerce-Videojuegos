import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Juego } from '../clases/juego';
import { Articulo } from '../clases/articulo';

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
            miArray.push(new Juego(unDato.id, unDato.titulo, unDato.precio, unDato.plataformaId,unDato.generoId,unDato.formatoId,
            unDato.plataforma,unDato.genero,unDato.formato,unDato.foto,unDato.descripcion));                        
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
          let juego: Juego = new Juego(datos[0].id, datos[0].titulo, datos[0].precio, datos[0].plataformaId,datos[0].generoId,datos[0].formatoId,
            datos[0].plataforma,datos[0].genero,datos[0].formato,datos[0].foto,datos[0].descripcion);
          
          resolve(juego);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  public listarArticulosPromesa(juegoId): Promise<Array<Articulo>> {
    let promesa: Promise<Array<Articulo>> = new Promise((resolve, reject) => {
      this.miHttp.traerArticulos(juegoId)
        .then(datos => {
          console.log(datos);
          let miArray: Array<Articulo> = new Array<Articulo>();
          for (let unDato of datos) {
            miArray.push(new Articulo(unDato.id, unDato.juegoId, unDato.disponible, unDato.codigo));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  public RegistrarJuego(juego: Juego,file: any): Promise<boolean> {
    
    let result: Promise<boolean> = this.miHttp.entregarJuego(juego,file)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  public ActualizarJuego(juego: Juego,updateFoto: boolean,file: any): Promise<boolean> {
    
    let result: Promise<boolean> = this.miHttp.actualizarJuego(juego,updateFoto,file)
      .then(datos => {
        debugger;
        return true;
      })
      .catch(error => {
        debugger;
        console.log(error);
        return false;
      });
    return result;
  }
  public RegistrarArticulo(articulo: Articulo): Promise<boolean> {
    
    let result: Promise<boolean> = this.miHttp.entregarArticulo(articulo)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  AgregarArticulo(id:string):Promise<boolean>
  {
    let result: Promise<boolean> = this.miHttp.agregarArticulo(id)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  RetirarArticulo(id:string):Promise<boolean>
  {
    let result: Promise<boolean> = this.miHttp.retirarArticulo(id)
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
