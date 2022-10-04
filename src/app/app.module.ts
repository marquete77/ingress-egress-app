import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {environment} from "../environments/environment";

//Modules
import {AppRoutingModule} from "./app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgChartsModule} from "ng2-charts";

//Ngrx
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {appReducers} from "./app.reducer";

//AngularFire
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { AngularFireAuthModule } from '@angular/fire/compat/auth'


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { IngressEgressComponent } from './ingress-egress/ingress-egress.component';
import { StatisticsComponent } from './ingress-egress/statistics/statistics.component';
import { DetailComponent } from './ingress-egress/detail/detail.component';
import { SharedComponent } from './shared/shared.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { OrderIngressEgressPipe } from './pipes/order-ingress-egress.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IngressEgressComponent,
    StatisticsComponent,
    DetailComponent,
    SharedComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    OrderIngressEgressPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgChartsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
          logOnly: environment.production, // Restrict extension to log-only mode
        }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
