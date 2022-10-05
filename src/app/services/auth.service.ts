import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import * as authActions from "../auth/auth.actions";
import * as ingressEgressActions from "../ingress-egress/ingress-egresso.actions";
import {UserModel} from "../models/user.model";
import {Subscription} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;
  private user!: UserModel;

  get getUser() {
    return {... this.user}
  }

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) { }

  iniAuthListener() {
    this.auth.authState.subscribe(fuser => {
      if (fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/user`).valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = UserModel.fronFirebase(firestoreUser);
            this.user = user;
            this.store.dispatch(authActions.setUser({user}));
          })
      } else {
        // @ts-ignore
        this.user = null;
        this.userSubscription?.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(ingressEgressActions.unSetItems());
      }

    })
  }

  createUser(name: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then( ({user}) => {
        const newUser = new UserModel(user?.uid, name, user?.email);
        return this.firestore.doc(`${user?.uid}/user`).set({...newUser})

      });
  }

  login(email: string, password: string) {
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
