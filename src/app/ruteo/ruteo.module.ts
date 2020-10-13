import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from '../componentes/principal/principal.component';
import { AbmEmpleadosComponent } from '../componentes/abm-empleados/abm-empleados.component';
import { JuegoDatosComponent } from '../componentes/juego-datos/juego-datos.component';
import { ErrorComponent } from '../componentes/error/error.component';

import {VerificarService} from '../servicios/verificar.service';

const MiRuteo = [
{path: '' , component: PrincipalComponent},
{path: 'Principal' , component: PrincipalComponent},
{path: 'Empleados' , component: AbmEmpleadosComponent},
{path: 'Juego/:id' , component: JuegoDatosComponent},
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
