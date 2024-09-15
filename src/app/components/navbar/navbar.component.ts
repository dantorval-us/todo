import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { PrimeraPalabraPipe } from '@shared/primera-palabra.pipe';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink, PrimeraPalabraPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  usuario: User | null;
  currentRoute: string = '';

  constructor (
    private _router: Router,
    private readonly _authService: AuthService
  ) {
    this.usuario = this._authService.getCurrentUser();
  }

  ngOnInit() {
    this.getCurrentRoute();    
  }

  getCurrentRoute(): void {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

  handleLogout(): void {
    if (this._authService.esAnonimo()){
      this._authService.deleteCurrentUser();
    }

    this._authService.logout();
  }

}
