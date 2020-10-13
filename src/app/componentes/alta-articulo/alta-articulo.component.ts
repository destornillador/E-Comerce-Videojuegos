import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { JuegoService } from '../../servicios/juego.service';
import { Articulo } from '../../clases/articulo';

@Component({
  selector: 'app-alta-articulo',
  templateUrl: './alta-articulo.component.html',
  styleUrls: ['./alta-articulo.component.css']
})
export class AltaArticuloComponent implements OnInit {

  codigo: string;
  formErrors = { 
    codigo: "", 
  };
  validation_messages = {
    codigo: {
      required: "Este campo es requerido",
      minlength: "Ingresá un codigo mayor o igual a 9 caracteres",
    },
  };
  
  public registroForm: FormGroup;
  public datos: any;

  constructor(
    public formBuilder: FormBuilder,
    public juegoService: JuegoService,
    public dialogref: MatDialogRef<AltaArticuloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.datos = this.data;
    this.registroForm = this.crearForm();
  }

  crearForm(): FormGroup {
    let form = this.formBuilder.group(
      {
        codigo: [this.codigo, [Validators.required,Validators.minLength(9)]],
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

  Agregar(){
    if (this.registroForm.invalid) return alert("Complete los campos requeridos");
    
    var juego = new Articulo(0,this.data.juegoId,true,this.codigo);

    this.juegoService.RegistrarArticulo(juego)
    .then((datos) => {
      if (datos == true) 
      {
        alert("Se registro con exito");
      }
      })
      .catch(
      (noSeEncontroUsuario) => { alert("Error en el sistema"); }
      );
  }
}
