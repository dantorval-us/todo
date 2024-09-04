import { Component, inject, Input } from '@angular/core';
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

  dialog = inject(MatDialog);

  constructor(private _tareaService: TareaService) {}

  handleCheck(): void  {
    this._tareaService.checkTarea(this.tarea.id, this.tarea.completada);
  }

  handleDelete(tareaId: string): void {
    this._tareaService.deleteTarea(tareaId);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TareaDetailComponent, {
      data: {
        id: this.tarea.id,
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
