import { AlertaConfirmacaoComponent } from './alerta-confirmacao/alerta-confirmacao.component';
import { AlertaAguardeComponent } from './alerta-aguarde/alerta-aguarde.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Injectable, Component, Output } from '@angular/core';
import { AlertaInfoComponent } from './alerta-info/alerta-info.component';

enum TipoModal {
  DANGER = 'danger',
  SUCCESS = 'success',
  AGUARDE = 'aguarde'
}

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  private abrirModal(componente: Object, tipo: string, mensagem: string, tempoExibicao?: number) {
    this.bsModalRef = new BsModalRef();
    this.bsModalRef = this.modalService.show(componente, {
      ignoreBackdropClick: true
    });
    this.bsModalRef.content.tipo = tipo;
    this.bsModalRef.content.mensagem = mensagem;

    if (tempoExibicao) {
      setTimeout( () => this.bsModalRef.hide(), tempoExibicao);
    }
  }

  abrirModalErros(mensagem: string, tempo?: number) {
   this.abrirModal(AlertaInfoComponent, TipoModal.DANGER, mensagem, tempo);
  }

  abrirModalSucesso(mensagem: string) {
    this.abrirModal(AlertaInfoComponent, TipoModal.SUCCESS, mensagem, 3000);
  }

  abrirModalConfirmacao(mensagem: string) {
    this.abrirModal(AlertaConfirmacaoComponent, TipoModal.SUCCESS, mensagem);
  }

  abrirModalAguarde(mensagem: string) {
    this.abrirModal(AlertaAguardeComponent, TipoModal.AGUARDE, mensagem);
  }

  fechar() {
    this.bsModalRef.hide();
    this.bsModalRef = null;
  }
}
