import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VerificarService } from '../../servicios/verificar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Output() valor: EventEmitter<any>= new EventEmitter<any>();  
  @Input()

  TIPO:string="";
  constructor(public verificarService:VerificarService,public router:Router) { }

  IR(destino:string)
  {
    this.router.navigate(['/'+destino]);
  }

  SignUp(){
    this.valor.emit(1);
  }
  SignIn(){
    this.valor.emit(2);
  }

  ngOnInit() {
    let tokenjs = localStorage.getItem("Token");
    let token:any = tokenjs!=null?JSON.parse(tokenjs):null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        if(datos.respuesta)
          this.TIPO = datos.respuesta.tipoUsuarioId;
        else
          this.TIPO = "0";
      }
    );
  }

}
