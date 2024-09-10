import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import { FeatureContainerComponent } from "@components/feature-container/feature-container.component";
import { NavbarComponent } from '@components/navbar/navbar.component';
import { LoginComponent } from '@features/login/login.component';
import { TodoListComponent } from "@features/todo-list/todo-list.component";
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

  ngOnInit() {
    this.setIdentificdo();
  }

  setIdentificdo(): void {
    this.identificado$ = user(this._auth).pipe(
      map((user) => !!user)
    );

    this.noIdentificado$ = this.identificado$.pipe(
      map(estaIdentificado => !estaIdentificado)
    );
  }

}
