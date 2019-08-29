import { CrudComponenteLista } from './../shared/crud/crud-componente-lista.class';
import { LoginService } from './../login/login.service';
import { AlertaConfirmacaoService } from './../shared/alertas/alerta-confirmacao/alerta-confirmacao.service';
import { AlertaService } from './../shared/alertas/alerta.service';
import { UsuarioService } from './usuario.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent extends CrudComponenteLista implements OnInit, OnDestroy {

  constructor(protected usuarioService: UsuarioService,
              protected alerta: AlertaService,
              protected loginService: LoginService,
              protected alertaConfirmacaoService: AlertaConfirmacaoService,
              protected rotaAtiva: ActivatedRoute,
              protected rota: Router) {

    super(usuarioService, alerta, loginService, alertaConfirmacaoService, rotaAtiva, rota);
  }

  ngOnInit() {
    this.inscricao();
    this.carregar();
  }

  ngOnDestroy() {
    this.desinscricao();
  }

  teste(teste) {
  }
}
