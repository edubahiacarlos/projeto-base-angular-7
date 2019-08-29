import { AlertaService } from './../shared/alertas/alerta.service';
import { LoginService } from '../login/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcessoAutorizadoGuard implements CanActivate {

  private constructor(private loginService: LoginService, private rota: Router, private alerta: AlertaService){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const autorizacaoPromise = this.loginService.estaAutorizado(next.routeConfig.path).toPromise();

      autorizacaoPromise.then( response => {
        return response;
      }, (erro) => {
        if (erro.status === 401) {
          this.loginService.erro401();
          return false;
        }

        this.rota.navigate(['/inicio']);
        return false;
      });

      return autorizacaoPromise;
  }
}
