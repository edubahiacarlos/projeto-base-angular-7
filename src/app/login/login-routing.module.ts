import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

const APP_ROUTES: Routes = [
    { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(APP_ROUTES),
  ]
})
export class LoginRoutingModule { }
