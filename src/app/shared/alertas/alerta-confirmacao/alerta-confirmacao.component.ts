import { AlertaConfirmacaoService } from './alerta-confirmacao.service';
import { AlertaService } from './../alerta.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-alerta-confirmacao',
  templateUrl: './alerta-confirmacao.component.html',
  styleUrls: ['./alerta-confirmacao.component.css']
})
export class AlertaConfirmacaoComponent implements OnInit {
  @Input() mensagem: string;
  @Input() tipo: 'success';

  constructor(private bsModalRef: BsModalRef, private alertaConfirmacaoService: AlertaConfirmacaoService) { }

  ngOnInit() {
  }

  fecharMensagem() {
    this.bsModalRef.hide();
  }

  acaoModal(acao: string) {
    this.alertaConfirmacaoService.eventoAcao.emit(acao);
  }
}
