import { ActivatedRoute, Router } from '@angular/router';
import { AlertaConfirmacaoService } from './../shared/alertas/alerta-confirmacao/alerta-confirmacao.service';
import { LoginService } from './../login/login.service';
import { AlertaService } from './../shared/alertas/alerta.service';
import { AcaoService } from './acao.service';
import { CrudComponenteLista } from './../shared/crud/crud-componente-lista.class';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-acao',
  templateUrl: './acao.component.html',
  styleUrls: ['./acao.component.css']
})
export class AcaoComponent extends CrudComponenteLista implements OnInit, OnDestroy {

  constructor(protected acaoService: AcaoService,
              protected alerta: AlertaService,
              protected loginService: LoginService,
              protected alertaConfirmacaoService: AlertaConfirmacaoService,
              protected rotaAtiva: ActivatedRoute,
              protected rota: Router) {

      super(acaoService, alerta, loginService, alertaConfirmacaoService, rotaAtiva, rota);
}
  ngOnInit() {
    this.carregar();
    this.inscricao();
  }

  ngOnDestroy() {
    this.desinscricao();
  }
}
