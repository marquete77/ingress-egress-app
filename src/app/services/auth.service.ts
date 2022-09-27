import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {UserModel} from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore) { }

  iniAuthListener() {
    this.auth.authState.subscribe(fuser => {
      console.log(fuser);
    })
  }

  createUser(name: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then( ({user}) => {
        const newUser = new UserModel(user?.uid, name, user?.email);
        return this.firestore.doc(`${user?.uid}/user`).set({...newUser})

      });
  }

  loginUser( email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }
}
