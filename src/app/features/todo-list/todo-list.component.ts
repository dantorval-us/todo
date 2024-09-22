import { Component, DestroyRef, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UpperCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TareaComponent } from "@components/tarea/tarea.component";
import { Tarea } from '@interfaces/tarea';
import { RouterOutletDataService } from '@services/router-outlet-data.service';
import { TareaService } from '@services/tarea.service';
import { noWithespaceValidator } from "@shared/customValidators";
import { tap } from 'rxjs';
import { customMatPaginatorIntl } from '@shared/customMatPaginatorIntl';

const MATERIAL_MODULE = [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, 
  MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatPaginatorModule, MatButtonToggleModule,
  MatSelectModule, MatMenuModule, MatTooltipModule];
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [UpperCasePipe, MATERIAL_MODULE, TareaComponent],
  providers: [{provide: MatPaginatorIntl, useClass: customMatPaginatorIntl}],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {

  titulo: string = "Mis tareas";
  tareas: Tarea[] = [];
  tareasPaginadas: Tarea[] = [];
  totalTareas = 0;
  tareasPorPagina = [5, 10, 20, 50]
  tamanioPagina = 5;
  paginaInicial = 0;

  tareasForm = this._formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, noWithespaceValidator()]],
  });

  tareasMostradasControl = new FormControl('todas');
  tareasOrdenadasControl = new FormControl('creciente');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('nombreTarea') nombreTarea!: ElementRef<HTMLInputElement>;

  private readonly _routerOutletData = inject(RouterOutletDataService);
  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private _tareaService: TareaService,
    private _formBuilder: FormBuilder
  ) {}

  get tareasFiltradas() {
    const filtros: { [key: string]: () => any[] } = {
      'completadas': () => this.tareas.filter(tarea => tarea.completada),
      'incompletas': () => this.tareas.filter(tarea => !tarea.completada),
      'todas': () => this.tareas
    };
  
    return filtros[this.tareasMostradasControl.value ?? 'todas']();
  }

  get tareasOrdenadas() {
    const orden = this.tareasOrdenadasControl.value;
  
    return this.tareasFiltradas.slice().sort((a, b) => {
      return orden === 'creciente' ? a.fechaCreacion - b.fechaCreacion : b.fechaCreacion - a.fechaCreacion;
    });
  }

  ngOnInit(): void {
    this.emitirTitulo();
    this.getTareas();
  }

  ngAfterViewInit(): void {
    this._enfocarTareasInput();
    this.paginaTareas();
  }

  emitirTitulo(): void {
    this._routerOutletData.changeData(this.titulo);
  }

  getTareas():void {
    this._tareaService.getTareas()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((tareas: Tarea[]) => this.tareas = tareas)
      )
      .subscribe((tareas) => {
        this.totalTareas = tareas.length;
        this.paginaTareas();
      });
  }

  deleteTareasCompletadas(): void {
    this._tareaService.deleteTareasCompletadas();
  }

  deleteTareasTodas(): void {
    this._tareaService.deleteTodasTareas();
  }

  pageEvent(event: PageEvent) {
    this.tamanioPagina = event.pageSize;
    this.paginaInicial = event.pageIndex;
    this.paginaTareas();
  }

  paginaTareas() {
    const startIndex = this.paginaInicial * this.tamanioPagina;
    const endIndex = startIndex + this.tamanioPagina;
    this.tareasPaginadas = this.tareasOrdenadas.slice(startIndex, endIndex);
    this.totalTareas = this.tareasFiltradas.length;

    if (this.tareasPaginadas.length === 0 && this.paginator.hasPreviousPage()) {
      this.paginator.previousPage();
    }
  }

  handleSubmit(): void {
    if (this.tareasForm.valid) {
      const nuevaTarea = this.tareasForm.value;
      this._tareaService.addTarea(nuevaTarea);
    }
    this.tareasForm.reset();
    this.getTareas();

    if (this.tareasOrdenadasControl.value == 'creciente' 
        && this.totalTareas + 1 > ((this.paginaInicial + 1) * this.tamanioPagina)) {
      setTimeout(() => {
        this.paginator.lastPage();
      }, 100);
    
    } else if (this.tareasOrdenadasControl.value == 'decreciente') {
      this.paginator.firstPage();
    }
  }

  private _enfocarTareasInput(): void {
    setTimeout(() => {
      this.nombreTarea.nativeElement.focus();
    });
  }

}
