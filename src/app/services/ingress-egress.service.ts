import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IngressEgressModel} from "../models/ingress-egress.model";
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IngressEgressService {

  constructor(private firestore: AngularFirestore,
              private authService: AuthService) {
  }

  createIngressEgress(ingressEgress: IngressEgressModel) {
    const uid = this.authService.getUser.uid;
    delete ingressEgress['uid']
    return this.firestore.doc(`${uid}/ingress-egress`)
      .collection('items')
      .add({...ingressEgress})
  }

  initIngresesEgresesListener(uid: string) {

    return this.firestore.collection(`${uid}/ingress-egress/items`).snapshotChanges()
      .pipe(
        map(
          snapshot => {
            return snapshot.map(doc => {
              return {
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data() as any
              }
            })
          }
        )
      );
  }

  deleteIngressEgress(uidItem: string) {
    const uid = this.authService.getUser.uid;
    return this.firestore.doc(`${uid}/ingress-egress/items/${uidItem}`).delete();
  }


}
