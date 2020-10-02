import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CustomMaterialModule } from './material/material.module';
import { RuteoModule } from './ruteo/ruteo.module';


//Componentes
import { AppComponent } from './app.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ErrorComponent } from './componentes/error/error.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';

//Servicios
import {HttpService} from './servicios/http.service';
import {JuegoService} from './servicios/juego.service';
import {UsuarioService} from './servicios/usuario.service';
import {VerificarService} from './servicios/verificar.service';



@NgModule({
  entryComponents: [
    LoginComponent,
    RegistroComponent
  ],
  declarations: [
    AppComponent,
    PrincipalComponent,
    ErrorComponent,
    MenuComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RuteoModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomMaterialModule
  ],
  providers: [
  JuegoService,
  UsuarioService,
  VerificarService,
  HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
