import { take } from 'rxjs/operators';
import { Perfil } from './../model/perfil.class';
import { environment } from 'src/environments/environment';
import { LoginService } from './../login/login.service';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud/crud-service.class';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService extends CrudService<Perfil> {

  constructor(protected http: HttpClient, protected loginService: LoginService) { 
    super(http, environment.API + 'api/v1/perfil', loginService);
  }

  dadosPerfilDominio() {
    return this.http.get<any[]>(environment.API + 'api/v1/perfildadosdominio', this.getCabecalho()).pipe(take(1));
  }

  buscaAcoesPossiveis(): any {
    return [
      { slug:  'criar', nome: 'Criar'},
      { slug:  'atualizar', nome: 'Atualizar'},
      { slug:  'apagar', nome: 'Apagar'},
      { slug:  'visualizar', nome: 'Visualizar'},
    ];
  }

  buscaFuncionalidades(): any {
    return [
      { slug:  'usuario', nome: 'Usuário'},
      { slug:  'perfil', nome: 'Perfil'}
    ];
  }
}
