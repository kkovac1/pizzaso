import { Injectable } from '@angular/core';
import { GoogleAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<User | null>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {

    this.user$ = this.afAuth.authState.pipe()
  }

  get uid() {
    return this.afAuth.currentUser.then(res => res?.uid)
  }

  signUpWithEmailAndPassword(email: string, password: string, displayName: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(result => {
      const userData: User = {
        uid: result.user!.uid,
        email: result.user!.email,
        displayName: displayName,
        photoURL: result.user!.photoURL
      };
      this.setUserData(userData);
      this.router.navigate(['/configurator']);
    })
  }

  signInViaEmailAndPassword(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(result => {
      this.router.navigate(['/configurator']);
    });
  }

  signInViaGoogle() {
    const provider = new GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider).then(result => {
      const userData: User = {
        uid: result.user!.uid,
        email: result.user!.email,
        displayName: result.user!.displayName,
        photoURL: result.user!.photoURL
      };
      this.setUserData(userData);
      this.router.navigate(['/configurator']);
    })
  }

  signInViaFacebook() {
    const provider = new FacebookAuthProvider();
    this.afAuth.signInWithPopup(provider).then(result => {
      const userData: User = {
        uid: result.user!.uid,
        email: result.user!.email,
        displayName: result.user!.displayName,
        photoURL: result.user!.photoURL
      };
      this.setUserData(userData);
      this.router.navigate(['/configurator']);
    })
  }

  setUserData(userData: User) {
    this.afs.doc(`users/${userData.uid}`).set(userData, { merge: true });
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
