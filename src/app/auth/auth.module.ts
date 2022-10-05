import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "../app-routing.module";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AppRoutingModule,
    RouterModule
  ]
})
export class AuthModule {
}
