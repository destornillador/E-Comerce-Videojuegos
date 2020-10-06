import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { JuegoService } from '../../servicios/juego.service';

@Component({
  selector: 'app-juego-datos',
  templateUrl: './juego-datos.component.html',
  styleUrls: ['./juego-datos.component.css']
})
export class JuegoDatosComponent implements OnInit {

  public juego: any;
  constructor(public JuegoService : JuegoService,public route:ActivatedRoute) { }

  ngOnInit(): void {
    const juegoId = this.route.snapshot.paramMap.get('id');
    this.JuegoService.obtenerJuego(juegoId).then(
      (datos) => {
        this.juego = datos;
      }
    );
  }

  AbrirModal(event: any) {

  }
}
