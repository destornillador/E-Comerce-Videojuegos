import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { JuegoService } from '../../../servicios/juego.service';

@Component({
  selector: 'app-alta-abm',
  templateUrl: './alta-abm.component.html',
  styleUrls: ['./alta-abm.component.css']
})
export class AltaAbmComponent implements OnInit {

  constructor(public formBuilder: FormBuilder,
    public juegoService: JuegoService,
    public dialogref: MatDialogRef<AltaAbmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public registroForm: FormGroup;
  formErrors = { 
    descripcion: "",
    precio: "",
    interes: "",
    numero: "",
  };
  validation_messages = {
    descripcion: {
      required: "Este campo es requerido",
    },
    precio: {
      required: "Este campo es requerido",
    },
    interes: {
      required: "Este campo es requerido",
    },
    numero: {
      required: "Este campo es requerido",
    },
  };

  ngOnInit(): void {
    this.registroForm = this.crearForm();
    if(this.data.tipoAbm != "ZONA"){
      this.registroForm.controls['precio'].disable();
    }
    if(this.data.tipoAbm != "CUOTA"){
      this.registroForm.controls['interes'].disable();
      this.registroForm.controls['numero'].disable();
    }
    else{
      this.registroForm.controls['descripcion'].disable();
    }
  }

  crearForm(): FormGroup {
    let form = this.formBuilder.group(
      {
        descripcion: [this.data.descripcion, [Validators.required]],
        precio: [this.data.precio, [Validators.required]],
        interes: [this.data.interes, [Validators.required]],
        numero: [this.data.numero, [Validators.required]],
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

  guardar(){
    if (this.registroForm.invalid) return alert("Complete los campos requeridos");

    this.juegoService.AltaABM(this.data).then(
      (datos) => {
        this.dialogref.close();
      }
    );    
  }
}
