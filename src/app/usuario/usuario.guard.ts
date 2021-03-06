import { ErroServidorService } from './../shared/servico/erroServidor.service';
import { LoginService } from './../login/login.service';
import { AlertaService } from './../shared/alertas/alerta.service';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../model/usuario.class';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements Resolve<Usuario> {

  constructor(private erroService: ErroServidorService,
              private usuarioService: UsuarioService,
              private alerta: AlertaService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Usuario | Observable<Usuario> | Promise<Usuario> {

    if (route.params && route.params['id']) {
      this.alerta.abrirModalAguarde('Aguarde...');

      const cursoPromise = this.usuarioService.getRecurso(route.params['id']).toPromise();

      cursoPromise.then( response => {
        this.alerta.fechar();
        return response;
      }, erro => {
       this.erroService.erro(erro);
      });

      return cursoPromise;
    }

    return of (new Usuario());
  }
}
