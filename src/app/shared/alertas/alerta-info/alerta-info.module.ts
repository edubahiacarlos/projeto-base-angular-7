import { ModalModule } from 'ngx-bootstrap';
import { AlertaAguardeComponent } from './../alerta-aguarde/alerta-aguarde.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertaInfoComponent } from './alerta-info.component';
//import { AlartaInfoService } from './alerta-info.service';

@NgModule({
  declarations: [
    AlertaInfoComponent
  ],
  imports: [
    CommonModule,
  ],
  entryComponents: [
    AlertaInfoComponent
  ],
  exports: [
//    AlertaInfoService
  ]
})
export class AlertaInfoModule { }
