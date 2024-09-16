import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import { FeatureContainerComponent } from "@components/feature-container/feature-container.component";
import { NavbarComponent } from '@components/navbar/navbar.component';
import { LoginComponent } from '@features/login/login.component';
import { TodoListComponent } from "@features/todo-list/todo-list.component";
import { AuthService } from '@services/auth.service';
import { map, Observable } from 'rxjs';

const COMPONENTS = [TodoListComponent, FeatureContainerComponent, NavbarComponent, LoginComponent];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, COMPONENTS, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  identificado$!: Observable<boolean>;
  noIdentificado$!: Observable<boolean>;

  private readonly _auth = inject(Auth)
  private readonly _authService = inject(AuthService)

  ngOnInit() {
    this.setIdentificado();
  }

  setIdentificado(): void {
    this.identificado$ = user(this._auth).pipe(
      map((user) => !!user)
    );

    this.noIdentificado$ = this.identificado$.pipe(
      map(estaIdentificado => !estaIdentificado)
    );
  }

  //Elimina usuario invitado si sale de la página sin hacer logout
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (this._authService.esAnonimo()) {
      // No eliminar el usuario si es una recarga
      const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (entries.length > 0 && entries[0].type === 'reload') {
        return; 
      }
  
      // Cualquier otra acción como cerrar pestaña o navegar fuera
      this._authService.deleteCurrentUser();
    }
  }

}
