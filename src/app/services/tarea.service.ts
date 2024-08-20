import { Injectable } from '@angular/core';
import { Tarea } from '../interfaces/tarea';
import { TAREAS } from '../tareas-data-mock';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  tareas: Tarea[] = TAREAS;

  constructor() { }

  getTareas(): Tarea[] {
    return this.tareas;
  }

  checkTarea(tareaId: string): void {
    // TODO
  }

  deleteTarea(tareaId: string): void {
    this.tareas = this.tareas.filter(tarea => tarea.id !== tareaId);
  }
}
