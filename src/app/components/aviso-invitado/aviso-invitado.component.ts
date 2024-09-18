import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { AuthService } from '@services/auth.service';

const MATERIAL_MODULE = [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule];

@Component({
  selector: 'app-aviso-invitado',
  standalone: true,
  imports: [MATERIAL_MODULE],
  templateUrl: './aviso-invitado.component.html',
  styleUrl: './aviso-invitado.component.css'
})
export class AvisoInvitadoComponent {

  private readonly _authService = inject(AuthService);

  handleLoginWithGoogle(): void {
    this._authService.deleteCurrentUser();
    this._authService.logout();
    this._authService.loginWithGoogle();
  }

}
