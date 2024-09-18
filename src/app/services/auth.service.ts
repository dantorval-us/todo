import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, GoogleAuthProvider, UserCredential, signOut, signInAnonymously, User} from '@angular/fire/auth';
import { TareaService } from './tarea.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _auth = inject(Auth);
  private readonly _router = inject(Router);
  private readonly _tareaService = inject(TareaService);

  getCurrentUser(): User | null {
    return this._auth.currentUser;
  }

  loginWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(this._auth, new GoogleAuthProvider())
      .then((credential) => {
        this._router.navigate([''])
        return credential;
      });
  }
  
  loginAnonymously(): Promise<UserCredential> {
    return signInAnonymously(this._auth)
      .then((credential) => {
        this._router.navigate([''])
        return credential;
      });
  }

  logout(): Promise<void> {
    return signOut(this._auth)
    .then((credential) => {
      this._tareaService.limpiaCache();
      this._router.navigate(['/login']);
      return credential;
    });
  }

  esAnonimo(): boolean {
    return this._auth.currentUser?.isAnonymous!;
  }

  deleteCurrentUser(): void {
    this._tareaService.deleteAllTareasUsuario(this._auth.currentUser?.uid!);
    this._auth.currentUser?.delete();
  }

}
