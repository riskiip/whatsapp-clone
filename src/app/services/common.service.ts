import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // Begini alur kerja nya:
  // 1. Autentikasi terlebih dahulu
  // 2. Simpan param tsb ke dalam value room/:id

  private user: User;
  private pathParamState: BehaviorSubject<string> = new BehaviorSubject<string>('');
  pathParam: Observable<string>;

  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { 
    this.pathParam = this.pathParamState.asObservable();
    
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.set('user', JSON.stringify(this.user));
        this.router.navigateByUrl('').then();
      } 
      else {
        localStorage.setItem('user', null);
      }
    });
  }

  loginWithGoogle() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then((data: auth.UserCredential) => {
      if(data.user) {
        this.user = data.user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigateByUrl('').then();
      }
      else {
        localStorage.setItem('user', null);
      }
    })
  }

  updatePathParamState(newPathParam: string) {
    this.pathParamState.next(newPathParam);
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login').then();
    })
  }

  getUser(): User {
    return this.user;
  }
}

export interface RoomData {
  name: string;
  id?: string;
}
