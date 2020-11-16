import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { VerificarService } from '../../servicios/verificar.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioService,
    public verificarService: VerificarService,
    public dialogref: MatDialogRef<RegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  public sexos = [];

  username: string;
  password: string;
  passwordCopia: string;
  nombre: string;
  sexo: string;
  apellido: string;
  email: string;
  telefono: number;
  fechaNacimiento: Date;

  tipo: number = 2;

  formErrors = { 
    usuario: "", 
    contrasenia: "",
    contraseniaCopia: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
    sexo: "" 
  };
  validation_messages = {
    usuario: {
      required: "Este campo es requerido",
      minlength: "Ingresá un usuario mayor a 5 caracteres",
    },
    contrasenia: {
      required: "Este campo es requerido",
      minlength: "Ingresá una contraseña mayor a 10 caracteres",
    },
    contraseniaCopia: {
      required: "Este campo es requerido",
      minlength: "Ingresá una contraseña mayor a 10 caracteres",
      invalidpass: "No coincide la contraseña"
    },
    nombre: {
      required: "Este campo es requerido",
    },
    apellido: {
      required: "Este campo es requerido",
    },
    email: {
      required: "Este campo es requerido",
      pattern: "Ingresá una dirección de correo válida.",
    },
    telefono: {
      required: "Este campo es requerido",
      rangelength: "Ingrese número de 8 a 11 digitos"
    },
    fechaNacimiento: {
      required: "Este campo es requerido",
    },
    sexo: {
      required: "Este campo es requerido",
    },
  };

  public registroForm: FormGroup;

  ngOnInit() {
    this.sexos = ["Masculino","Femenino"];
    this.registroForm = this.crearForm();
  }

  crearForm(): FormGroup {
    let form = this.formBuilder.group(
      {
        usuario: [this.username, [Validators.required,Validators.minLength(5)]],
        contrasenia: [this.password, [Validators.required,Validators.minLength(10)]],
        contraseniaCopia: [this.passwordCopia, [Validators.required,Validators.minLength(10)]],
        nombre: [this.nombre, [Validators.required]],
        apellido: [this.apellido, [Validators.required]],
        email: [this.email, [Validators.required,
        Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )]],
        telefono: [this.telefono, [Validators.required, this.validarTelefono]],
        fechaNacimiento: [this.fechaNacimiento, [Validators.required]],
        sexo: [this.sexo, [Validators.required]],
      },
      {validator: this.validarContraseña}
    );
    form.valueChanges.subscribe(data => this.onValueChanged(data));
    return form;
  };
  validarContraseña(group: FormGroup) {
    group.controls['contraseniaCopia'].setValidators([Validators.required,Validators.minLength(10)])

    if(group.controls['contraseniaCopia'].valid){
      if(group.controls["contrasenia"].value == group.controls["contraseniaCopia"].value){
        group.controls['contraseniaCopia'].setErrors(null);
      }
      else{
        group.controls['contraseniaCopia'].setErrors({ 'invalidpass': true });
      }
    }
    return
  }
  validarTelefono(control: FormControl){
    if(control.value == null || (control.value.toString().length >= 8 && control.value.toString().length <= 11)){
       return null
    }
    else{
       return { rangelength: true };
    }
  }
  onValueChanged(data?: any) {
    if (!this.registroForm) {
      return;
    }
    const form = this.registroForm;
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
  actualizarTipo(value:number){
    this.tipo = value;
  }
  registrar(){
    if (this.registroForm.invalid) return alert("Complete los campos requeridos");

    this.usuarioService.verificar(this.username)
    .then((resultado) => {
        if(!resultado.exito){
          return alert(resultado.mensaje);
        }

        var fecha = this.fechaNacimiento.toDateString().split(" ");
        var fechaString = this.obtenerFecha(fecha);
        var estado = 1;
        if(this.tipo == 3){
          estado = 3;
        }

        var usuario = new Usuario(0,this.username,this.password,this.nombre,this.apellido,this.sexo,this.email,this.telefono,fechaString,this.tipo,estado);

        this.usuarioService.RegistrarCliente(usuario)
            .then((datos) => {
              if (datos == true) 
              {
                this.usuarioService.BuscarUsuario(this.username, this.password)
                .then((datos) => {
                  if (datos != null) {
                    if(datos.estado == 1)
                    {
                      this.crearToken(datos);
                    }
                    else{
                      alert("En este momento no esta habilitado para trabajar");
                    }
                  }
                  else {
                    alert("Problema al iniciar sesión, el usuario o la contraseña son incorrectos");
                  }
                })
                .catch(
                (noSeEncontroUsuario) => { alert("Datos incorrectos"); }
                );
              }
              })
              .catch(
              (noSeEncontroUsuario) => { alert("Error en el sistema"); }
              );
    })
    .catch(
    (noSeEncontroUsuario) => { alert("Error en el sistema"); }
    );

    
  }
  obtenerFecha(fecha){
    switch(fecha[1]){
      case "Jan":
        return(fecha[2]+"/01/"+fecha[3]);
      case "Feb":
        return(fecha[2]+"/02/"+fecha[3]);
      case "Mar":
        return(fecha[2]+"/03/"+fecha[3]);
      case "Apr":
        return(fecha[2]+"/04/"+fecha[3]);
      case "May":
        return(fecha[2]+"/05/"+fecha[3]);
      case "Jun":
        return(fecha[2]+"/06/"+fecha[3]);
      case "Jul":
        return(fecha[2]+"/07/"+fecha[3]);
      case "Aug":
        return(fecha[2]+"/08/"+fecha[3]);
      case "Sep":
        return(fecha[2]+"/09/"+fecha[3]);
      case "Oct":
        return(fecha[2]+"/010/"+fecha[3]);
      case "Nov":
        return(fecha[2]+"/11/"+fecha[3]);
      case "Dec":
        return(fecha[2]+"/12/"+fecha[3]);
    } 
  }
  crearToken(datos: any) {
    this.verificarService.crearToken(datos).then((datos) => {
      if (datos == true)
        window.location.reload();
    })
  }
}
