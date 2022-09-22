import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from "@angular/router";
import {StatisticsComponent} from "../ingress-egress/statistics/statistics.component";
import {IngressEgressComponent} from "../ingress-egress/ingress-egress.component";
import {DetailComponent} from "../ingress-egress/detail/detail.component";

export const dashboardRoutes: Routes = [
  {path: '', component: StatisticsComponent},
  {path: 'ingress-egress', component: IngressEgressComponent},
  {path: 'detail', component: DetailComponent},
]
