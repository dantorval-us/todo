import { Component, DestroyRef, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UpperCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TareaComponent } from "@components/tarea/tarea.component";
import { Tarea } from '@interfaces/tarea';
import { TareaService } from '@services/tarea.service';
import { noWithespaceValidator } from "@shared/customValidators";
import { tap } from 'rxjs';

const MATERIAL_MODULE = [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, 
  MatIconModule, MatButtonModule, MatProgressSpinnerModule];

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [UpperCasePipe, MATERIAL_MODULE, TareaComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {

  titulo: string = "Mis tareas";
  tareas!: Tarea[];

  tareaForm = this._formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, noWithespaceValidator()]],
  });

  @ViewChild('nombreTarea') nombreTarea!: ElementRef<HTMLInputElement>;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private _tareaService: TareaService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getTareas();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.nombreTarea.nativeElement.focus();
    });
  }

  getTareas():void {
    this._tareaService.getTareas()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((tareas: Tarea[]) => this.tareas = tareas)
      )
      .subscribe()
  }

  handleSubmit(): void {
    if (this.tareaForm.valid) {
      const nuevaTarea = this.tareaForm.value;
      this._tareaService.addTarea(nuevaTarea);
    }
    this.tareaForm.reset();
  }

}
