import { ErroServidorService } from './../shared/servico/erroServidor.service';
import { LoginService } from './../login/login.service';
import { AlertaService } from './../shared/alertas/alerta.service';
import { Perfil } from './../model/perfil.class';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PerfilService } from './perfil.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilGuard implements Resolve<Perfil> {

  constructor(private erroService: ErroServidorService, private perfilService: PerfilService, private alerta: AlertaService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Perfil | Observable<Perfil> | Promise<Perfil> {

    if (route.params && route.params['id']) {
      this.alerta.abrirModalAguarde('Aguarde...');

      const perfilPromise = this.perfilService.getRecurso(route.params['id']).toPromise();

      perfilPromise.then( response => {
        this.alerta.fechar();
        return response;
      }, erro => {
        this.erroService.erro(erro);
      });

      return perfilPromise;
    }

    return of (new Perfil());
  }
}
