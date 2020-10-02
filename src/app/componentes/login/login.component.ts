import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import { VerificarService } from '../../servicios/verificar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioService,
    public verificarService: VerificarService,
    public dialogref: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  username: string;
  password: string;

  formErrors = { usuario: "", contrasenia: "" };
  validation_messages = {
    usuario: {
      required: "Este campo es requerido",
      minlength: "Ingresá un usuario mayor a 5 caracteres",
    },
    contrasenia: {
      required: "Este campo es requerido",
      minlength: "Ingresá una contraseña mayor a 10 caracteres",
    },
  };
    

  public loginForm: FormGroup;
  
  ngOnInit() {
    this.loginForm = this.crearForm();
  }

  crearForm(): FormGroup {
    let form = this.formBuilder.group(
      {
        usuario: [this.username, [Validators.required,Validators.minLength(5)]],
        contrasenia: [this.password, [Validators.required,Validators.minLength(10)]],
      }
    );
    form.valueChanges.subscribe(data => this.onValueChanged(data));
    return form;
  };
  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
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

  clickNo(){
    this.dialogref.close();
  }

  
  logIn() {
    if (this.loginForm.invalid) return alert("Complete los campos requeridos");
    
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
  crearToken(datos: any) {
    this.verificarService.crearToken(datos).then((datos) => {
      if (datos == true)
        window.location.reload();
    })
  }
}
