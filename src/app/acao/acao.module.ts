import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcaoRoutingModule } from './acao-routing.module';
import { AcaoComponent } from './acao.component';
import { AcaoFormComponent } from './acao-form/acao-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AcaoComponent, AcaoFormComponent],
  imports: [
    CommonModule,
    AcaoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ]
})
export class AcaoModule { }
