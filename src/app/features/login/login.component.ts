import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CarruselComponent } from '@components/carrusel/carrusel.component';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CarruselComponent, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  loginWithGoogle(): void {
    this._authService.loginWithGoogle()
      .then(() => {
        this._router.navigate(['/todo-list'])
      })
      .catch(error => console.log(error));
  }

}
