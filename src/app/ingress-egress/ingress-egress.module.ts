import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {NgChartsModule} from "ng2-charts";

import {SharedModule} from "../shared/shared.module";
import {DashboardRoutesModule} from "../dashboard/dashboard-routes.module";

import {DashboardComponent} from "../dashboard/dashboard.component";
import {IngressEgressComponent} from "./ingress-egress.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {DetailComponent} from "./detail/detail.component";
import {OrderIngressEgressPipe} from "../pipes/order-ingress-egress.pipe";

import {StoreModule} from "@ngrx/store";
import {ingressEgressReducer} from "./ingress-egress.reducer";



@NgModule({
  declarations: [
    DashboardComponent,
    IngressEgressComponent,
    StatisticsComponent,
    DetailComponent,
    OrderIngressEgressPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingressEgress', ingressEgressReducer),
    RouterModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutesModule
  ]
})
export class IngressEgressModule { }
