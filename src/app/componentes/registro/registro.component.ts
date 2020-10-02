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
        telefono: [this.telefono, [Validators.required]],
        fechaNacimiento: [this.fechaNacimiento, [Validators.required]],
        sexo: [this.sexo, [Validators.required]],
      }
    );
    form.valueChanges.subscribe(data => this.onValueChanged(data));
    return form;
  };
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

  registrar(){
    //if (this.registroForm.invalid) return alert("Complete los campos requeridos");
    var fecha = this.fechaNacimiento.toDateString().split(" ");
    var fechaString = this.obtenerFecha(fecha);
    
    var usuario = new Usuario(0,this.username,this.password,this.nombre,this.apellido,this.sexo,this.email,this.telefono,fechaString,2);

    this.usuarioService.RegistrarCliente(usuario)
        .then((datos) => {
          if (datos == true) 
          {
            this.usuarioService.BuscarUsuario(this.username, this.password)
            .then((datos) => {
              if (datos != null) {
                this.crearToken(datos);
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
