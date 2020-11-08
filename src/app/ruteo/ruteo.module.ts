import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from '../componentes/principal/principal.component';
import { AbmEmpleadosComponent } from '../componentes/abm-empleados/abm-empleados.component';
import { JuegoDatosComponent } from '../componentes/juego-datos/juego-datos.component';
import { CarritoComponent } from '../componentes/carrito/carrito.component';
import { FinalizarCompraComponent } from '../componentes/finalizar-compra/finalizar-compra.component';
import { ListaComprasComponent } from '../componentes/lista-compras/lista-compras.component';
import { ListaGenerosComponent } from '../componentes/ABM/lista-generos/lista-generos.component';
import { ListaCuotasComponent } from '../componentes/ABM/lista-cuotas/lista-cuotas.component';
import { ListaPlataformasComponent } from '../componentes/ABM/lista-plataformas/lista-plataformas.component';
import { ListaZonasComponent } from '../componentes/ABM/lista-zonas/lista-zonas.component';
import { DatosVentaComponent } from '../componentes/datos-venta/datos-venta.component';
import { ErrorComponent } from '../componentes/error/error.component';

import {VerificarService} from '../servicios/verificar.service';

const MiRuteo = [
{path: '' , component: PrincipalComponent},
{path: 'Principal' , component: PrincipalComponent},
{path: 'Empleados' , component: AbmEmpleadosComponent},
{path: 'Juego/:id' , component: JuegoDatosComponent},
{path: 'Carrito' , component: CarritoComponent},
{path: 'FinalizarCompra' , component: FinalizarCompraComponent},
{path: 'ListaCompras' , component: ListaComprasComponent},
{path: 'VentaDatos' , component: DatosVentaComponent},
{path: 'Generos' , component: ListaGenerosComponent},
{path: 'Plataformas' , component: ListaPlataformasComponent},
{path: 'ZonasEnvio' , component: ListaZonasComponent},
{path: 'Cuotas' , component: ListaCuotasComponent},
{path: '**' , component: ErrorComponent},
{path: 'error' , component: ErrorComponent}]


@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule,
  ]
})
export class RuteoModule { }
