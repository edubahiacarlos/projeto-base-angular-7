import { AcaoService } from './../acao/acao.service';
import { Funcionalidade } from './../model/funcionalidade.class';
import { CrudComponenteLista } from './../shared/crud/crud-componente-lista.class';
import { FuncionalidadeService } from './funcionalidade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaConfirmacaoService } from './../shared/alertas/alerta-confirmacao/alerta-confirmacao.service';
import { LoginService } from './../login/login.service';
import { AlertaService } from './../shared/alertas/alerta.service';
import { Component, OnInit, Input, OnDestroy, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-funcionalidade',
  templateUrl: './funcionalidade.component.html',
  styleUrls: ['./funcionalidade.component.css']
})
export class FuncionalidadeComponent extends CrudComponenteLista implements OnInit, OnDestroy {

  constructor(protected funcionalidadeService: FuncionalidadeService,
              protected alerta: AlertaService,
              protected loginService: LoginService,
              protected alertaConfirmacaoService: AlertaConfirmacaoService,
              protected rotaAtiva: ActivatedRoute,
              protected rota: Router) {

    super(funcionalidadeService, alerta, loginService, alertaConfirmacaoService, rotaAtiva, rota);
  }

  ngOnInit() {
    this.inscricao();
    this.carregar();
  }

  ngOnDestroy() {
    this.desinscricao();
  }

  criarNovaFuncionalidade() {
    this.alerta.abrirModalAguarde('Aguarde...');
    this.funcionalidadeService.cadastraListaFuncionalidades().subscribe( () => {
      this.carregar();
    }, erro => {
      if (erro.status === 401) {
        this.loginService.erro401();
      }
    });
  }
}
