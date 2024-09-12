import { Component, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { TareaService } from '@services/tarea.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  usuario: User | null;

  private readonly _tareaService = inject(TareaService);

  constructor (private readonly _authService: AuthService) {
    this.usuario = this._authService.getCurrentUser();
  }

  handleLogout(): void {
    if (this._authService.esAnonimo()){
      this._authService.deleteCurrentUser();
    }

    this._authService.logout();
  }

}
