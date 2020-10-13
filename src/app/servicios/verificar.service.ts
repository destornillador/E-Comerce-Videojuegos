import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class VerificarService {

  private _token: string = "";
  constructor(private http: HttpService) {
    this._token = localStorage.getItem('Token');
  }

  canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> {

    this._token = localStorage.getItem('Token');
    let token:any = this._token!=null?JSON.parse(this._token):null;
    let result: Promise<boolean> = this.http.verificarToken(token)
      .then(datos => {
        if (datos.esValido == true)
          return true
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }

  crearToken(datos: any) {
    let result: Promise<boolean> = this.http.crearToken(datos).then(
      (misDatos) => {
        localStorage.setItem("Token", JSON.stringify(misDatos.respuesta));
        return true;
      });
    return result;
  }
  recuperToken(token: any)
  { 
    let result: Promise<any> = this.http.recuperarToken(token).then((misDatos) => {
        return misDatos;
      });;
    return result;
  }
}
