import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { MatDialog,MatDialogConfig } from "@angular/material/dialog";
import { ConfirmarCompraComponent } from '../confirmar-compra/confirmar-compra.component';
import { VentaService } from '../../servicios/venta.service'
import { VerificarService } from '../../servicios/verificar.service';
@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.css']
})
export class FinalizarCompraComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    public ventaService: VentaService,
    public verificarService: VerificarService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  public compraForm: FormGroup;
  public zonas = [];
  public pagos = [];
  public retiros = [];
  public lista = [];
  public cuotas = [];
  public total = 0;
  public nombre = "";
  public apellido = "";
  public telefono = "";
  public email = "";
  public retiro;
  public zona;
  public pago;
  public cuota;
  public dni: number;
  public direccion: string;
  public numeroTarjeta: number;
  public mostrarForm = false;

  formErrors = { 
    nombre: "", 
    apellido: "",
    telefono: "",
    email: "",
    tipoRetiro:"",
    zona:"",
    pago:"",
    cuota:"",
    direccion:"",
    dni:"",
    numeroTarjeta:"",
  };
  validation_messages = {
    nombre: {
      required: "Este campo es requerido",
    },
    apellido: {
      required: "Este campo es requerido",
    },
    telefono: {
      required: "Este campo es requerido",
    },
    email: {
      required: "Este campo es requerido",
    },
    tipoRetiro: {
      required: "Este campo es requerido",
    },
    zona: {
      required: "Este campo es requerido",
    },
    pago: {
      required: "Este campo es requerido",
    },
    cuota: {
      required: "Este campo es requerido",
    },
    direccion: {
      required: "Este campo es requerido",
    },
    dni: {
      required: "Este campo es requerido",
    },
    numeroTarjeta: {
      required: "Este campo es requerido",
    },
  };

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.lista = JSON.parse(params['listaCarrito']);
        for(var i = 0; i < this.lista.length;i++){
          this.total += this.lista[i].precio * this.lista[i].cantidad;
        }
      });
    let tokenjs = localStorage.getItem("Token");
    let token:any = tokenjs!=null?JSON.parse(tokenjs):null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        if(datos.respuesta){
          this.nombre = datos.respuesta.nombre;
          this.apellido = datos.respuesta.apellido;
          this.email = datos.respuesta.email;
          this.telefono = datos.respuesta.telefono;
          this.mostrarForm = true;
        }
      }
    );
    this.cargarCombos();
    this.compraForm = this.crearForm();
  }

  cargarCombos(){
     this.ventaService.listarFormasPagoPromesa()
    .then((datos) => {
        this.pagos = datos;
      })
      .catch(
      (noSeEncontroUsuario) => { alert("Error en el sistema"); }
      );
    this.ventaService.listarTiposRetiroPromesa()
    .then((datos) => {
        this.retiros = datos;
      })
      .catch(
      (noSeEncontroUsuario) => { alert("Error en el sistema"); }
      );
    this.ventaService.listarZonasPromesa()
    .then((datos) => {
        this.zonas = datos;
      })
      .catch(
      (noSeEncontroUsuario) => { alert("Error en el sistema"); }
      );
    this.ventaService.listarCuotasPromesa()
    .then((datos) => {
        this.cuotas = datos;
      })
      .catch(
      (noSeEncontroUsuario) => { alert("Error en el sistema"); }
      );
  }

  crearForm(): FormGroup {
    let form = this.formBuilder.group(
      {
        nombre: [this.nombre, [Validators.required]],
        apellido: [this.apellido, [Validators.required]],
        telefono: [this.telefono, [Validators.required]],
        email: [this.email, [Validators.required]],
        tipoRetiro: [this.retiro, [Validators.required]],
        cuota: [this.cuota, [Validators.required]],
        pago: [this.pago, [Validators.required]],
        zona: [this.zona, [Validators.required]],
        dni: [this.dni, [Validators.required]],
        numeroTarjeta: [this.numeroTarjeta, [Validators.required]],
        direccion: [this.direccion, [Validators.required]],
      }
    );
    form.valueChanges.subscribe(data => this.onValueChanged(data));
    return form;
  };
  onValueChanged(data?: any) {
    if (!this.compraForm) {
      return;
    }
    const form = this.compraForm;
      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          // clear previous error message (if any)
          this.formErrors[field] = "";
          const control = form.get(field);
          if (control && !control.valid) {
            const messages = this.validation_messages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + " ";
              }
            }
          }
        }
      }
  }
  
  public cambiarRequerimientosDireccion(){
    if(this.retiro.id == 1){
      this.compraForm.controls['direccion'].enable();
      this.compraForm.controls['zona'].enable(); 
    }
    else{
      this.compraForm.controls['direccion'].disable();
      this.compraForm.controls['zona'].disable(); 
      this.direccion = "";
      this.zona = null;
    }
  }
  public cambiarRequerimientosPago(){
    if(this.pago.id == 2){
      this.compraForm.controls['cuota'].enable();
    }
    else{
      this.compraForm.controls['cuota'].disable();
      this.cuota = null;
    }
  }
  finalizar(){
    if (this.compraForm.invalid) return alert("Complete los campos requeridos");
    
    var nuevoTotal = this.total;
    if(this.pago.id == 2){
      nuevoTotal = nuevoTotal + nuevoTotal * (this.cuota.interes /100);
    }
    if(this.retiro.id == 1){
      nuevoTotal = nuevoTotal + this.zona.precio;
    }

    const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        lista: this.lista,
        total: nuevoTotal,
        tieneEnvio: this.retiro.id == 1,
        tieneCuotas: this.pago.id == 2,
        cuota: this.cuota,
        envio: this.zona,
        retiro: this.retiro,
        pago: this.pago,
        domicilio: this.direccion,
        tarjeta: this.numeroTarjeta
      };     
      dialogConfig.width = "600px"; 
      
      const dialogRef = this.dialog.open(ConfirmarCompraComponent, dialogConfig);
      
      dialogRef.afterClosed().subscribe(res => {
        console.log(res);
      })
  }

  AbrirModal(event: any) {
    if(event == 0){
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }

}
