import { Component, ElementRef, ViewChild } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TareaComponent } from "@components/tarea/tarea.component";
import { Tarea } from '@interfaces/tarea';
import { TareaService } from '@services/tarea.service';
import { noWithespaceValidator } from "@shared/customValidators";

const MATERIAL_MODULE = [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule];

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [UpperCasePipe, MATERIAL_MODULE, TareaComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  titulo: string = "Mis tareas";
  tareas: Tarea[] = [];
  id = 10; //mock

  tareaForm = this.formBuilder.group({
    nombre: ['', [Validators.required, noWithespaceValidator()]],
  });

  @ViewChild('nombreTarea') nombreTarea!: ElementRef<HTMLInputElement>;

  constructor(
    private tareaService: TareaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tareas = this.tareaService.getTareas();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.nombreTarea.nativeElement.focus();
    });
  }

  handleSubmit(): void {
    if (this.tareaForm.valid) {
      this.id++;
      this.tareas.push(
        {
          id: this.id.toString(),
          nombre: this.tareaForm.value.nombre!,
          completada: false
        }
      )
    }

    this.tareaForm.reset();

  }

  updateList(): void {
    this.tareas = this.tareaService.getTareas();
  }

}
