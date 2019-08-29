import { EventEmitter } from '@angular/core';

export class Paginacao {

    get paginaAtual(): number {
        return this._paginaAtual;
    }

    set paginaAtual(paginaAtual: number) {
        this._paginaAtual = paginaAtual;
        Paginacao.pagaAtualEmitter.emit(paginaAtual);
    }

    get totalItens(): number {
        return this._totalItens;
    }

    set totalItens(totalItens: number) {
        this._totalItens = totalItens;
    }

    get itensPorPagina(): number {
        return this._itensPorPagina;
    }

    set itensPorPagina(total) {
        this._itensPorPagina = total;
    }

    get botaoAnterior(): string {
        return this._botaoAnterior;
    }

    get botaoProximo(): string {
        return this._botaoProximo;
    }

    get botaoPrimeiro(): string {
        return this._botaoPrimeiro;
    }

    get botaoUltimo(): string {
        return this._botaoUltimo;
    }

    static pagaAtualEmitter = new EventEmitter<number>();
    private _paginaAtual = 1;
    private _totalItens = 0;
    private _itensPorPagina = 10;
    private _botaoAnterior = 'Anterior';
    private _botaoProximo = 'Próximo';
    private _botaoPrimeiro = 'Primeiro';
    private _botaoUltimo = 'Ultimo';
}
