import { MatCheckboxModule } from '@angular/material/checkbox';
import { AlertaConfirmacaoModule } from './alertas/alerta-confirmacao/alerta-confirmacao.module';
import { PaginacaoModule } from './paginacao/paginacao.module';
import { AlertaAguardeModule } from './alertas/alerta-aguarde/alerta-aguarde.module';
import { AlertaInfoModule } from './alertas/alerta-info/alerta-info.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginacaoComponent } from './paginacao/paginacao.component';
import { ExibicaoValidacaoModule } from './exibicao-validacao/exibicao-validacao.module';
import { ExibicaoValidacaoComponent } from './exibicao-validacao/exibicao-validacao.component';
import { UiMaskDirective } from './ui-mask.directive';
import { CheckboxDinamicoComponent } from './checkbox-dinamico/checkbox-dinamico.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UiMaskDirective,
    CheckboxDinamicoComponent
  ],
  imports: [
    CommonModule,
    PaginacaoModule,
    AlertaAguardeModule,
    AlertaInfoModule,
    AlertaConfirmacaoModule,
    ExibicaoValidacaoModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  exports: [
    PaginacaoComponent,
    ExibicaoValidacaoComponent,
    UiMaskDirective,
    CheckboxDinamicoComponent,
  ]
})
export class SharedModule { }
