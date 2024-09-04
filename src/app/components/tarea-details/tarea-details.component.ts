import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TareaService } from '@services/tarea.service';

const MATERIAL_MODULE = [MatDialogModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule];

@Component({
  selector: 'app-tarea-detail',
  standalone: true,
  imports: [MATERIAL_MODULE, ReactiveFormsModule],
  templateUrl: './tarea-details.component.html',
  styleUrl: './tarea-details.component.css'
})
export class TareaDetailComponent implements OnInit {

  private readonly _data = inject(MAT_DIALOG_DATA);
  nombre = this._data.nombre;
  editNombre: boolean = false;
  inputVacio: boolean = false;
  tareaForm!: FormGroup;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private _formBuilder: FormBuilder,
    private _tareaService: TareaService
  ) {}

  ngOnInit(): void {
    this._buildForm();
    this._comprobarNombreValido();
  }

  private _buildForm(): void {
    this.tareaForm = this._formBuilder.nonNullable.group({
      nombre: [this.nombre],
    });
  }

  handleUpdate(): void {
    this._tareaService.updateTarea(this._data.id, this.tareaForm.value);
  }

  toggleEditNombre(): void { 
    if (this.tareaForm.get('nombre')!.value.trim().length) {
      if (this.editNombre) {
        this.nombre = this.tareaForm.get('nombre')!.value.trim();
        this.tareaForm.setValue({nombre: this.nombre});
      }
      this.editNombre = !this.editNombre;
    }
  }

  enfocarTareaInput(): void {
    setTimeout(() => {
      document.getElementById("nombreTarea")?.focus();
    });
  }

  private _comprobarNombreValido(): void {
    this.tareaForm.get('nombre')?.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(value => {
        this.inputVacio = !value.trim().length;
      });
  }

}
