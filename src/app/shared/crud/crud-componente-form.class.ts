import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/login/login.service';
import { CrudService } from './crud-service.class';
import { AlertaService } from '../alertas/alerta.service';
import { Router} from '@angular/router';
import { Location } from '@angular/common';

export class CrudComponenteForm {

    constructor(protected crudService: CrudService<any>,
                protected location: Location,
                protected alerta: AlertaService,
                protected loginService: LoginService,
                protected rota: Router) {
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
            this.alerta.fechar();
            if (erro.status === 401) {
                this.loginService.erro401();
            }
            this.alerta.abrirModalErros(erro.data.mensagem);
        });

        return recursoPromise;
    }
}
