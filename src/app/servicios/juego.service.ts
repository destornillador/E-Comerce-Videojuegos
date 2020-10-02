import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Juego } from '../clases/juego';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor(public miHttp: HttpService) { }
  public listarJuegosPromesa(): Promise<Array<Juego>> {
    let promesa: Promise<Array<Juego>> = new Promise((resolve, reject) => {
      this.miHttp.buscarJuego("","","")
        .then(datos => {
          console.log(datos);
          let miArray: Array<Juego> = new Array<Juego>();
          for (let unDato of datos) {
            miArray.push(new Juego(unDato.id, unDato.titulo, unDato.precio, unDato.plataformaId,unDato.formatoId,unDato.generoId,unDato.stock,unDato.foto));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
}
