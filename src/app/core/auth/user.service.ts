import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public db: AngularFirestore, private afAuth: AngularFireAuth) {
  }
  getCurrentUser() {
    const context = this;
    return new Promise<any> ((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('no user logged in');
        }
      }.bind(context));
    });
  }
  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }
  isUserAuthenticated() {
    return this.afAuth.authState;
  }
}
