import { take } from 'rxjs/operators';
import { Funcionalidade } from '../model/funcionalidade.class';
import { environment } from './../../environments/environment';
import { LoginService } from './../login/login.service';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud/crud-service.class';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FuncionalidadeService extends CrudService<Funcionalidade> {

  constructor(protected http: HttpClient, protected loginService: LoginService, private rota: Router) {
    super(http, environment.API + 'api/v1/funcionalidade', loginService);
  }

  cadastraListaFuncionalidades() {
    const novasFuncionalidades: Funcionalidade[] = [];

    const lista: any[] = this.rota.config.filter( rota => {
      return rota.data.mapeado;
    });

    lista.forEach( (funcionalidadeRota: any) => {
      const funcionalidade = new Funcionalidade();

      funcionalidade.nome = funcionalidadeRota.data.title;
      funcionalidade.slug = funcionalidadeRota.path;

      novasFuncionalidades.push(funcionalidade);
    });

    return this.http.post(environment.API + 'api/v1/listafuncionalidades',
                          {data: novasFuncionalidades },
                          this.getCabecalho()).pipe(take(1));
  }

  funcionalidadesComAcoes() {
    return this.http.get<Funcionalidade[]>(environment.API + 'api/v1/funcionalidadescomacoes', this.getCabecalho()).pipe(take(1));
  }
}
