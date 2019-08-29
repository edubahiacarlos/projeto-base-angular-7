import { UsuarioComponent } from './usuario.component';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsuarioComponent, UsuarioFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class UsuarioModule { }
