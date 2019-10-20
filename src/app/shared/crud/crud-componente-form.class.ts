import { ErroServidorService } from './../servico/erroServidor.service';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/login/login.service';
import { CrudService } from './crud-service.class';
import { AlertaService } from '../alertas/alerta.service';
import { Router} from '@angular/router';
import { Location } from '@angular/common';

export class CrudComponenteForm {
    erroService: ErroServidorService;

    constructor(protected crudService: CrudService<any>,
                protected location: Location,
                protected alerta: AlertaService,
                protected loginService: LoginService,
                protected rota: Router) {

        this.erroService = new ErroServidorService(this.alerta, this.loginService, this.rota);
    }


    irPara(url: string[]) {
        this.rota.navigate(url);
    }

    limparFormulario(form: FormGroup) {
        form.reset();
    }

    salvar(recurso: any) {
        this.alerta.abrirModalAguarde('Aguarde...');

        const recursoPromise = this.crudService.save(recurso).toPromise();
        recursoPromise.then( () => {
            this.irPara([this.rota.url.split('/')[1]]);
            return true;
        }, erro => {
            this.erroService.erro(erro);
        });

        return recursoPromise;
    }
}
