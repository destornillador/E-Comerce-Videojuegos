import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Articulo } from '../../clases/articulo';
import { JuegoService } from '../../servicios/juego.service';

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styleUrls: ['./lista-articulos.component.css']
})
export class ListaArticulosComponent implements OnInit {

  @Output() cambio: EventEmitter<any>= new EventEmitter<any>();  
  @Input()

  public listaArticulos: Array<Articulo> = [];
  constructor(public juegoService: JuegoService) { }

  ngOnInit(): void {
  }

  Agregar(articuloId: string){
    this.juegoService.AgregarArticulo(articuloId).then((datos) =>{
      if(datos)
      {
        this.cambio.emit();
      }
    })
  }
  Retirar(articuloId: string){
    this.juegoService.RetirarArticulo(articuloId).then((datos) =>{
      if(datos)
      {
        this.cambio.emit();
      }
    })
  }
}

