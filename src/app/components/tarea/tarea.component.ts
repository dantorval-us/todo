import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TareaDetailComponent } from '@components/tarea-details/tarea-details.component';
import { Tarea } from '@interfaces/tarea';
import { TareaService } from '@services/tarea.service';

const MATERIAL_MODULE = [FormsModule, MatCheckboxModule, MatIconModule, MatButtonModule];
@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [MATERIAL_MODULE],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})
export class TareaComponent {

  @Input() tarea!: Tarea;
  @Output() tareaEliminada = new EventEmitter<string>();

  dialog = inject(MatDialog);

  constructor(private tareaService: TareaService) {}

  handleCheck(): void  {
    this.tareaService.checkTarea(this.tarea.id);
  }

  handleDelete(tareaId: string): void {
    this.tareaService.deleteTarea(tareaId);
    this.tareaEliminada.emit(tareaId);
  }

  openDialog() {
    const dialogRef = this.dialog.open(TareaDetailComponent, {
      data: {
        nombre: this.tarea.nombre
      },
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tarea.nombre = result.nombre;
      }
    });
  }

}
