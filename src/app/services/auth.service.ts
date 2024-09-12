import { inject, Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, UserCredential, signOut, signInAnonymously, User} from '@angular/fire/auth';
import { TareaService } from './tarea.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _auth = inject(Auth);
  private readonly _tareaService = inject(TareaService);

  getCurrentUser(): User | null {
    return this._auth.currentUser;
  }

  loginWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(this._auth, new GoogleAuthProvider());
  }
  
  loginAnonymously(): Promise<UserCredential> {
    return signInAnonymously(this._auth);
  }

  logout(): Promise<void> {
    return signOut(this._auth);
  }

  esAnonimo(): boolean {
    return this._auth.currentUser?.isAnonymous!;
  }

  deleteCurrentUser(): void {
    this._tareaService.deleteAllTareasUsuario(this._auth.currentUser?.uid!);
    this._auth.currentUser?.delete();
  }

}
