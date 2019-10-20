import { LoginService } from 'src/app/login/login.service';
import { AlertaService } from './../alertas/alerta.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErroServidorService {

  constructor(private alerta: AlertaService,
              private loginService: LoginService,
              private rota: Router) {
  }

  erro(data: any) {
    this.alerta.fechar();
    if (data.status === 401) {
      this.erro401();
      return;
    }

    this.erroPadrao(data);
  }

  private erro401() {
    console.log('401');
    this.alerta.abrirModalErros('Você não está logado. Você foi redirecionado para tela de login');
    this.loginService.removerItensSessao();
    this.loginService.estaLogado();
    this.rota.navigate(['/login']);
  }

  private erroPadrao(data: any) {
    if (data.error.mensagem) {
      this.alerta.abrirModalErros(data.error.mensagem);
  } else {
      this.alerta.abrirModalErros(data.message);
  }
  }

}
