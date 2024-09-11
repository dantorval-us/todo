import { inject, Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, UserCredential, signOut, signInAnonymously, User} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _auth = inject(Auth);

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
    this._auth.currentUser?.delete();
  }

}
