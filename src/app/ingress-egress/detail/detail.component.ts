import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateWithIngressEgress} from "../ingress-egress.reducer";
import {IngressEgressModel} from "../../models/ingress-egress.model";
import {Subscription} from "rxjs";
import {IngressEgressService} from "../../services/ingress-egress.service";
import Swal from "sweetalert2";



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  ingressEgress: IngressEgressModel[] = [];
  ingressEgressSubs!: Subscription;

  constructor(private store: Store<AppStateWithIngressEgress>,
              private ingressEgressService: IngressEgressService) {
  }

  ngOnInit(): void {
    this.ingressEgressSubs = this.store.select('ingressEgress')
      .subscribe(({items}) => this.ingressEgress = items);
  }

  ngOnDestroy() {
    this.ingressEgressSubs.unsubscribe();
  }

  delete(uid: any) {
    this.ingressEgressService.deleteIngressEgress(uid)
      .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
      .catch(err => Swal.fire('Error', err.message, 'error'));
  }

}
