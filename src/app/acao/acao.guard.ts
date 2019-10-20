import { ErroServidorService } from './../shared/servico/erroServidor.service';
import { Acao } from './../model/Acao.class';
import { AcaoService } from './acao.service';
import { AlertaService } from '../shared/alertas/alerta.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcaoGuard implements Resolve<Acao> {

  constructor(private erroService: ErroServidorService, private acaoService: AcaoService, private alerta: AlertaService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Acao | Observable<Acao> | Promise<Acao> {

    if (route.params && route.params['id']) {
      this.alerta.abrirModalAguarde('Aguarde...');

      const acaoPromise = this.acaoService.getRecurso(route.params['id']).toPromise();

      acaoPromise.then( response => {
        this.alerta.fechar();
        return response;
      }, erro => {
        this.erroService.erro(erro);
      });

      return acaoPromise;
    }

    return of (new Acao());
  }
}
