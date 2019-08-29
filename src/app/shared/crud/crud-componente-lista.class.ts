import { LoginService } from '../../login/login.service';
import { CrudService } from './crud-service.class';
import { AlertaConfirmacaoService } from '../alertas/alerta-confirmacao/alerta-confirmacao.service';
import { AlertaService } from '../alertas/alerta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Paginacao } from '../paginacao/paginacao.class';
import { isFunction } from 'ngx-bootstrap/chronos/utils/type-checks';

export class CrudComponenteLista {
    config: Paginacao = new Paginacao();
    modelExclusao: any;
    paginacao$: any;
    modalConfirmacaoEvento: any;
    recursos: any = [];

    constructor(protected crudService: CrudService<any>,
                protected alerta: AlertaService,
                protected loginService: LoginService,
                protected alertaConfirmacaoService: AlertaConfirmacaoService,
                protected rotaAtiva: ActivatedRoute,
                protected rota: Router) {
    }

    public carregar() {
        if (this.alerta.bsModalRef == null) {
            this.alerta.abrirModalAguarde('Aguarde...');
        }

        this.crudService.getLista(this.config.paginaAtual).subscribe( response => {
            this.configuarPaginacao( response['total'], response['per_page']);
            this.recursos = response['data'];
            this.alerta.fechar();
            return this.recursos;
        }, data => {

        });
    }

    public abrirCadastro(url: string) {
        this.rota.navigate([url]);
    }

    public abrirEdicao(url: string, id: number) {
        this.rota.navigate([url, id], { relativeTo: this.rotaAtiva });
    }

    public abrirVisualizacao(url: string, id: number) {
        this.rota.navigate([url, id], { relativeTo: this.rotaAtiva });
    }

    public confirmacaoExclusao(model: any) {
        this.modelExclusao = model;
        const mensagem = 'Você tem certeza de que deseja excluir os dados?';
        this.alerta.abrirModalConfirmacao(mensagem);
    }

    public excluir() {
        const excluirPromise = this.crudService.remove(this.modelExclusao.id).toPromise();
        this.alerta.fechar();
        this.alerta.abrirModalAguarde('Aguarde...');
        excluirPromise.then( () => {
            this.carregar();
        }, erro => {
            this.alerta.fechar();
            this.alerta.abrirModalErros('Erro ao tentar excluir');
        });

        return excluirPromise;
    }
    public inscricao() {
        this.modalConfirmacaoEvento = this.alertaConfirmacaoService.eventoAcao.subscribe( ( acao: string ) => {
            if (acao === 'sim') {
               this.excluir();
            } else {
                this.modelExclusao = {};
                this.alerta.fechar();
            }
        });

        this.paginacao$ = Paginacao.pagaAtualEmitter.subscribe( response => {
            this.carregar();
        });
    }

    public desinscricao() {
        this.paginacao$.unsubscribe();
        this.modalConfirmacaoEvento.unsubscribe();
    }

    configuarPaginacao(total: number, itensPorPagina: number) {
        this.config.itensPorPagina = itensPorPagina;
        this.config.totalItens = total;
    }

    controleAcesso(acao) {
        const acoes = this.loginService.controleAcesso();

        if (acoes != null) {
            const a = acoes.find( re => {
                return re['slug'] === this.rota.url.replace('/', '');
            });

            if (a != null) {
                return a.acoes.includes(acao) ? a.acoes.includes(acao) : false;
            }
        }

        return false;
    }
}
