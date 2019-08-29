import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Paginacao } from './paginacao.class';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css']
})
export class PaginacaoComponent implements OnInit{
  @Input() config: Paginacao;

  constructor() { }

  ngOnInit() {
  }

  acao(evento: any) {
    this.config.paginaAtual = evento.page;
  }
}
