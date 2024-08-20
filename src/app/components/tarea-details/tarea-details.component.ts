import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

const MATERIAL_MODULE = [MatDialogModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule];

@Component({
  selector: 'app-tarea-detail',
  standalone: true,
  imports: [MATERIAL_MODULE, ReactiveFormsModule],
  templateUrl: './tarea-details.component.html',
  styleUrl: './tarea-details.component.css'
})
export class TareaDetailComponent {

  data = inject(MAT_DIALOG_DATA);
  nombre = this.data.nombre;
  editNombre: boolean = false;

  tareaForm = this.formBuilder.group({
    nombre: [this.nombre],
  });

  @ViewChild('nombreTarea') nombreTarea!: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder) {}

  handleUpdate() {
    this.nombre = this.tareaForm.get('nombre')!.value;
  }

  toggleEditNombre() {
    if(this.editNombre == true) {
      this.handleUpdate();
    }
    this.editNombre = !this.editNombre;
  }

  enfocarTareaInput(): void {
    setTimeout(() => {
      this.nombreTarea.nativeElement.focus();
    });
  }

}
