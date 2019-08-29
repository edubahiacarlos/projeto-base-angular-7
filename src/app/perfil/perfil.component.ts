import { PerfilService } from './perfil.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaConfirmacaoService } from './../shared/alertas/alerta-confirmacao/alerta-confirmacao.service';
import { LoginService } from './../login/login.service';
import { AlertaService } from './../shared/alertas/alerta.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudComponenteLista } from './../shared/crud/crud-componente-lista.class';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent extends CrudComponenteLista implements OnInit, OnDestroy {

  constructor(protected perfilService: PerfilService,
              protected alerta: AlertaService,
              protected loginService: LoginService,
              protected alertaConfirmacaoService: AlertaConfirmacaoService,
              protected rotaAtiva: ActivatedRoute,
              protected rota: Router) {

      super(perfilService, alerta, loginService, alertaConfirmacaoService, rotaAtiva, rota);
}
  ngOnInit() {
    this.carregar();
    this.inscricao();
  }

  ngOnDestroy() {
    this.desinscricao();
  }
}
