import { AlertaService } from './../shared/alertas/alerta.service';
import { environment } from './../../environments/environment';
import { Login } from './login.interface';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static logado = new EventEmitter<boolean>(false);

  constructor(private rota: Router, private http: HttpClient, private alerta: AlertaService) { }

  fazerLogin(login: Login) {
    return this.http.post(environment.API + 'api/auth/login', login).pipe(take(1));
  }

  estaLogado() {
    if (this.token()) {
      LoginService.logado.emit(true);
      return true;
    }

    LoginService.logado.emit(false);
    return false;
  }

  usuarioLogado() {
    return JSON.parse(sessionStorage.getItem('usuarioLogado'));
  }

  token(){
    return sessionStorage.getItem('token');
  }

  controleAcesso() {
    return JSON.parse(sessionStorage.getItem('controleAcesso'));
  }

  adicionarItensSessao(dados: any) {
    sessionStorage.setItem('token', dados['token']);
    sessionStorage.setItem('usuarioLogado', JSON.stringify(dados['usuarioLogado']));
    sessionStorage.setItem('controleAcesso', JSON.stringify(dados['controleAcesso']));
  }

  removerItensSessao() {
    sessionStorage.removeItem('usuarioLogado');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('controleAcesso');
  }

  sair() {
    return this.http.post(environment.API + 'api/auth/logout', {}, {headers: { Authorization: this.token() } })
              .pipe(take(1));
  }

  estaAutorizado(funcionalidade: string) {
    const cabecalho = { headers: { Authorization: this.token() } };
    return this.http.get<boolean>(environment.API + 'api/autorizacao/' + funcionalidade, cabecalho).pipe(take(1));
  }

  trocarSenha(dados: {}) {
    return this.http.post<any>(environment.API + 'api/auth/alterarsenha', dados).pipe(take(1));
  }

  erro401() {
    this.removerItensSessao();
    this.estaLogado();
    this.alerta.abrirModalErros('Você não está logado. Você foi redirecionado para tela de login');
    this.rota.navigate(['/login']);
  }
}
