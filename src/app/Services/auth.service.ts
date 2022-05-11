import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';

import { switchMap } from 'rxjs/operators';

import { User } from './user.model'; // optional

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null | undefined>;
  private user: any;
  constructor(
    private afAuth: AngularFireAuth,
    private store: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          this.setUser(user);
          return this.store.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  async googleSignin() {
    const credential = await this.afAuth.signInWithPopup(
      new GoogleAuthProvider()
    );
    return this.updateUserData(credential.user);
  }

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    this.setUser(user);
    const userRef: AngularFirestoreDocument<User> = this.store.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    userRef.set(data, { merge: true });
    return this.router.navigate(['/TODO']);
  }
  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
  setUser(user: any) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }
}
