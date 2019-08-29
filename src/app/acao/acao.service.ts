import { take } from 'rxjs/operators';
import { Acao } from './../model/Acao.class';
import { LoginService } from 'src/app/login/login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { CrudService } from './../shared/crud/crud-service.class';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcaoService extends CrudService<Acao> {

  constructor(protected http: HttpClient, protected loginService: LoginService) { 
    super(http, environment.API + 'api/acoes', loginService);
  }

  dadosAcaoDominio() {
    return this.http.get<Acao[]>(environment.API + 'api/acaodadosdominio', this.getCabecalho()).pipe(take(1));
  }
}
