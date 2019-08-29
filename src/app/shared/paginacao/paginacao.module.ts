import { PaginacaoComponent } from './paginacao.component';
import { PaginationModule } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PaginacaoComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
  ],
  exports: [
    PaginacaoComponent
  ]
})
export class PaginacaoModule { }
