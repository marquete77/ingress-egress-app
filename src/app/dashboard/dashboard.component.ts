import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngressEgressService} from "../services/ingress-egress.service";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import * as ingressEgressActions from "../ingress-egress/ingress-egresso.actions";
import {filter, Subscription} from "rxjs";
import Swal from "sweetalert2";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs!: Subscription;
  ingressEgressSubs!: Subscription;

  constructor(private store: Store<AppState>,
              private ingressEgressService: IngressEgressService) {
  }

  ngOnInit(): void {

    this.userSubs = this.store.select('user').pipe(
      filter(auth => auth.user != null)
    )
      .subscribe(({user}) => {
      if (user.uid !== undefined) {
        this.ingressEgressSubs = this.ingressEgressService.initIngresesEgresesListener(user.uid)
          .subscribe(ingresesEgresesFB => {
            this.store.dispatch(ingressEgressActions.setItems({items: ingresesEgresesFB}))
          });
      } else {
        Swal.fire('Error', 'Hubo un erro', 'error')
      }

    })

  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
    this.ingressEgressSubs.unsubscribe();
  }

}
