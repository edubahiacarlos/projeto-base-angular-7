import { LoginService } from '../login/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcessoAutenticadoGuard implements CanActivate {

  private constructor(private loginService: LoginService, private rotas: Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (!this.loginService.estaLogado()) {
        this.rotas.navigate(['/login']);
      }

      return this.loginService.estaLogado();
  }
}
