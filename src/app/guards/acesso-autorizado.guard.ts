import { ErroServidorService } from './../shared/servico/erroServidor.service';
import { AlertaService } from './../shared/alertas/alerta.service';
import { LoginService } from '../login/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcessoAutorizadoGuard implements CanActivate {

  private constructor(private loginService: LoginService, private erroService: ErroServidorService){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const autorizacaoPromise = this.loginService.estaAutorizado(next.routeConfig.path).toPromise();

      autorizacaoPromise.then( response => {
        return response;
      }, (erro) => {
        this.erroService.erro(erro);
        return false;
      });

      return autorizacaoPromise;
  }
}
