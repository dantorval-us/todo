import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AvisoInvitadoComponent } from '@components/aviso-invitado/aviso-invitado.component';
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
  readonly dialog = inject(MatDialog);

  loginWithGoogle(): void {
    this._authService.loginWithGoogle()
      .catch((error) => {
        console.log('Error en autenticación con Google', error)
      });
  }

  loginAnonymously(): void {
    this._authService.loginAnonymously()
      .then(() => {
        this.openDialogAvisoInvitado();
      })
      .catch((error) => {
        console.error('Error en autenticación anónima:', error);
      });
  }

  openDialogAvisoInvitado(): void {
    this.dialog.open(AvisoInvitadoComponent)
  }

}
