import { ErroServidorService } from './../shared/servico/erroServidor.service';
import { LoginService } from './../login/login.service';
import { FuncionalidadeService } from './funcionalidade.service';
import { AlertaService } from './../shared/alertas/alerta.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Funcionalidade } from '../model/funcionalidade.class';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class FuncionalidadeGuard implements Resolve<Funcionalidade> {

  constructor(private erroService: ErroServidorService,
              private alerta: AlertaService,
              private funcionalidadeService: FuncionalidadeService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Funcionalidade | Observable<Funcionalidade> | Promise<Funcionalidade> {

    if (route.params && route.params['id']) {
      this.alerta.abrirModalAguarde('Aguarde...');

      const funcionalidadePromise = this.funcionalidadeService.getRecurso(route.params['id']).toPromise();

      funcionalidadePromise.then( response => {
        this.alerta.fechar();
        return response;
      }, erro => {
        this.erroService.erro(erro);
      });

      return funcionalidadePromise;
    }

    return of (new Funcionalidade());
  }
}
