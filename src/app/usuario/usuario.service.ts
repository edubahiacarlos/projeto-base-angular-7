import { LoginService } from './../login/login.service';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/crud/crud-service.class';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario.class';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<Usuario> {
  constructor(protected http: HttpClient, protected loginService: LoginService) {
    super(http, environment.API + 'api/usuarios', loginService);
  }
}
