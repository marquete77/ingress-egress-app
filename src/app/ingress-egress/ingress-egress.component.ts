import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IngressEgressModel} from "../models/ingress-egress.model";
import {IngressEgressService} from "../services/ingress-egress.service";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import {Subscription} from "rxjs";
import * as ui from "../shared/ui.actions";

@Component({
  selector: 'app-ingress-egress',
  templateUrl: './ingress-egress.component.html',
  styleUrls: ['./ingress-egress.component.css']
})
export class IngressEgressComponent implements OnInit, OnDestroy {

  ingressEgressForm!: FormGroup;
  type: string = 'ingress';
  loading: boolean = false;
  loadingSubscription!: Subscription;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private ingressEgressService: IngressEgressService) { }

  ngOnInit(): void {

    this.ingressEgressForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    })
    this.loadingSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);

  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  save() {
    console.log('save', this.ingressEgressForm);
    if (this.ingressEgressForm.invalid) {return}

    this.store.dispatch(ui.isLoading());

    const {description, amount} = this.ingressEgressForm.value;
    const ingressEgress = new IngressEgressModel(description, amount, this.type);

    this.ingressEgressService.createIngressEgress(ingressEgress)
      .then(() => {
        this.ingressEgressForm.reset();
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Registro creado', description , 'success');
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', err.message, 'error')
      });
  }

}
