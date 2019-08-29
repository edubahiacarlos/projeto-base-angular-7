import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from './../shared/shared.module';
import { FuncionalidadeFormComponent } from './funcionalidade-form/funcionalidade-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionalidadeRoutingModule } from './funcionalidade-routing.module';
import { FuncionalidadeComponent } from './funcionalidade.component';

@NgModule({
  declarations: [FuncionalidadeComponent, FuncionalidadeFormComponent ],
  imports: [
    CommonModule,
    FuncionalidadeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ]
})
export class FuncionalidadeModule { }
