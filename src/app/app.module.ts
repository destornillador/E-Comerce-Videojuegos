import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CustomMaterialModule } from './material/material.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { RuteoModule } from './ruteo/ruteo.module';


//Componentes
import { AppComponent } from './app.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ErrorComponent } from './componentes/error/error.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { JuegoDatosComponent } from './componentes/juego-datos/juego-datos.component';
import { AbmEmpleadosComponent } from './componentes/abm-empleados/abm-empleados.component';
import { ListaEmpleadosComponent } from './componentes/lista-empleados/lista-empleados.component';

//Modals
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AltaJuegoComponent } from './componentes/alta-juego/alta-juego.component';

//Servicios
import {HttpService} from './servicios/http.service';
import {JuegoService} from './servicios/juego.service';
import {UsuarioService} from './servicios/usuario.service';
import {VerificarService} from './servicios/verificar.service';

@NgModule({
  entryComponents: [
    LoginComponent,
    RegistroComponent,
    AltaJuegoComponent,
  ],
  declarations: [
    AppComponent,
    PrincipalComponent,
    ErrorComponent,
    MenuComponent,
    LoginComponent,
    RegistroComponent,
    JuegoDatosComponent,
    AltaJuegoComponent,
    AbmEmpleadosComponent,
    ListaEmpleadosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RuteoModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomMaterialModule,
    NgxFileDropModule
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
