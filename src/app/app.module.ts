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
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { FinalizarCompraComponent } from './componentes/finalizar-compra/finalizar-compra.component';
import { ListaComprasComponent } from './componentes/lista-compras/lista-compras.component';
import { ListaGenerosComponent } from './componentes/ABM/lista-generos/lista-generos.component';
import { ListaCuotasComponent } from './componentes/ABM/lista-cuotas/lista-cuotas.component';
import { ListaPlataformasComponent } from './componentes/ABM/lista-plataformas/lista-plataformas.component';
import { ListaZonasComponent } from './componentes/ABM/lista-zonas/lista-zonas.component';

//Modals
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AltaJuegoComponent } from './componentes/alta-juego/alta-juego.component';
import { ConfirmarCompraComponent } from './componentes/confirmar-compra/confirmar-compra.component';
import { DatosVentaComponent } from './componentes/datos-venta/datos-venta.component';
import { AltaAbmComponent } from './componentes/ABM/alta-abm/alta-abm.component';

//Servicios
import {HttpService} from './servicios/http.service';
import {JuegoService} from './servicios/juego.service';
import {UsuarioService} from './servicios/usuario.service';
import {VentaService} from './servicios/venta.service';
import {VerificarService} from './servicios/verificar.service';

@NgModule({
  entryComponents: [
    LoginComponent,
    RegistroComponent,
    AltaJuegoComponent,
    ConfirmarCompraComponent,
    AltaAbmComponent
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
    ListaEmpleadosComponent,
    CarritoComponent,
    FinalizarCompraComponent,
    ConfirmarCompraComponent,
    ListaComprasComponent,
    DatosVentaComponent,
    ListaGenerosComponent,
    ListaCuotasComponent,
    ListaPlataformasComponent,
    ListaZonasComponent,
    AltaAbmComponent
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
  VentaService,
  VerificarService,
  HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
