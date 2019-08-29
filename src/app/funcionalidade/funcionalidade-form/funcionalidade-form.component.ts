import { Acao } from './../../model/Acao.class';
import { AcaoService } from './../../acao/acao.service';
import { Subscribable } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { CrudComponenteForm } from './../../shared/crud/crud-componente-form.class';
import { ValidacaoForm } from './../../shared/validacao-form/validacao-form';
import { Funcionalidade } from '../../model/funcionalidade.class';
import { AlertaService } from './../../shared/alertas/alerta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionalidadeService } from './../funcionalidade.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-funcionalidade-form',
  templateUrl: './funcionalidade-form.component.html',
  styleUrls: ['./funcionalidade-form.component.css']
})
export class FuncionalidadeFormComponent extends CrudComponenteForm implements OnInit {
  form: FormGroup;

  // tslint:disable-next-line: no-unused-expression
  acoes: Acao[];
/*
  acoes = [
    { slug:  'criar', nome: 'Criar'},
    { slug:  'atualizar', nome: 'Atualizar'},
    { slug:  'apagar', nome: 'Apagar'},
    { slug:  'visualizar', nome: 'Visualizar'},
  ];
*/
  funcionalidade = new Funcionalidade();

  constructor(private formBuilder: FormBuilder,
              protected loginService: LoginService,
              protected funcionalidadeService: FuncionalidadeService,
              protected alerta: AlertaService,
              protected location: Location,
              private rotaAtual: ActivatedRoute,
              protected rota: Router,
              private acaoService: AcaoService) {

    super(funcionalidadeService, location, alerta, loginService, rota);
  }

  ngOnInit() {
    this.carregaAsAcoes();
    this.criarAtualizarForm(this.rotaAtual.snapshot.data['funcionalidade']);
  }

  carregaAsAcoes() {
    this.acaoService.dadosAcaoDominio().subscribe( response => {
      this.acoes = response;
    });
  }

  criarAtualizarForm(funcionalidade: Funcionalidade) {
    this.funcionalidade = funcionalidade;

    this.form = this.formBuilder.group({
      id: [funcionalidade.id],
      nome: [funcionalidade.nome, Validators.required],
    });

    if (this.rota.url.includes('visualizar')) {
      this.form.disable();
    }
  }

  submit() {
    if (this.form.valid) {
      this.funcionalidade.nome = this.form.get('nome').value;

      if (this.form.get('id').value) {
        this.funcionalidade.id = this.form.get('id').value;
      }

      this.salvar(this.funcionalidade);
    }
  }

  escolherAcao(acao: any) {
    if (acao.selecionado) {
      this.funcionalidade.acoesSelecionadas.push(acao);
    } else {
      this.funcionalidade.acoesSelecionadas.splice(this.funcionalidade.acoesSelecionadas.indexOf(acao), 1);
    }
  }

  buildAcoes() {

    const valores = this.acoes.map( (acaoPossivel) => {

      const selecionado = this.funcionalidade.acoesSelecionadas.some( acaoSelecionada => {
        return acaoSelecionada.slug === acaoPossivel.slug;
      });

      return new FormControl(selecionado);
    });

    return this.formBuilder.array(valores);
  }
}
