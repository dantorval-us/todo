import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div class="app-container">
    <header>
      <span class="todo-logo">
        <img src="assets/images/logo-no-background.png" alt="TODO">
      </span>
    </header>
    
    <nav>
      <app-navbar />
    </nav>
    
    <main>
      <router-outlet />
    </main>
  </div>
  `,
  styles: `
    .todo-logo, .todo-logo img {
      height: 1.5rem;
    }

    .todo-logo {
      margin: 1rem;
    }
  `
})
export class MainLayoutComponent {

}
