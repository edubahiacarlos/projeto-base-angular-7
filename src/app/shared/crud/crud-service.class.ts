import { LoginService } from '../../login/login.service';
import { take, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { empty } from 'rxjs';

export class CrudService<T> {
    constructor(protected http: HttpClient, private API_URL: string, protected loginService: LoginService) {
    }

    private readonly API = this.API_URL;

    getLista(paginaAtual?: number, filtro?: any) {
        let url = this.API;

        if (paginaAtual != null) {
            url += '?page=' + paginaAtual;
        }

        if (filtro != null) {
            url += '&filtro=' + filtro;
        }

        return this.http.get<T[]>(url, this.getCabecalho()).pipe(take(1));
    }

    getRecurso(id: number) {
        if (id == null) {
            // tslint:disable-next-line: deprecation
            return empty();
        }

        return this.http.get<T>(this.API + '/' + id, this.getCabecalho()).pipe(take(1));
    }

    private create(recurso: T) {
        return this.http.post<T>(this.API, recurso, this.getCabecalho()).pipe(take(1));
    }

    private update(recurso: T) {
        return this.http.put<T>(this.API + '/' + recurso['id'], recurso, this.getCabecalho()).pipe(take(1));
    }

    save(recurso: T) {
        if (recurso['id']) {
            return this.update(recurso);
        }

        return this.create(recurso);
    }

    remove(id: number) {
        return this.http.delete(this.API + '/' + id, this.getCabecalho()).pipe(take(1));
    }

    getOutrasApi(url: string) {
        return this.http.get(url).pipe(take(1));
    }

    getCabecalho() {
        return { headers: { Authorization: this.loginService.token() } };
    }
}
