import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlterarSenhaRoutingModule } from './alterar-senha-routing.module';
import { AlterarSenhaComponent } from './alterar-senha.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AlterarSenhaComponent],
  imports: [
    CommonModule,
    AlterarSenhaRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    SharedModule,
  ]
})
export class AlterarSenhaModule { }
