import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from '../componentes/principal/principal.component';
import { ErrorComponent } from '../componentes/error/error.component';

import {VerificarService} from '../servicios/verificar.service';

const MiRuteo = [
{path: '' , component: PrincipalComponent},
{path: 'Principal' , component: PrincipalComponent},
{path: '**' , component: ErrorComponent},
{path: 'error' , component: ErrorComponent}]


@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteoModule { }
