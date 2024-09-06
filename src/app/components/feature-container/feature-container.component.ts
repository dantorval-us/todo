import { UpperCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { TemporizadorComponent } from "@features/temporizador/temporizador.component";
import { TodoListComponent } from "@features/todo-list/todo-list.component";
import { RouterOutletDataService } from '@services/router-outlet-data.service';

@Component({
  selector: 'app-feature-container',
  standalone: true,
  imports: [RouterOutlet, UpperCasePipe, TemporizadorComponent, TodoListComponent],
  templateUrl: './feature-container.component.html',
  styleUrl: './feature-container.component.css'
})
export class FeatureContainerComponent implements OnInit {

  titulo!: string;

  private readonly _routerOutletData = inject(RouterOutletDataService);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getTitulo();
  }

  ngAfterViewChecked(): void {
    this._cdr.detectChanges();
  }

  getTitulo(): void {
    this._routerOutletData.$data
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(data => {
        this.titulo = data;
      });
  }

}
