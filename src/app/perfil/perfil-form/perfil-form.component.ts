import { FuncionalidadeService } from './../../funcionalidade/funcionalidade.service';
import { Acao } from './../../model/Acao.class';
import { CrudComponenteForm } from './../../shared/crud/crud-componente-form.class';
import { AlertaService } from './../../shared/alertas/alerta.service';
import { PerfilService } from './../perfil.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Perfil } from './../../model/perfil.class';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css']
})
export class PerfilFormComponent extends CrudComponenteForm implements OnInit {
  form: FormGroup;
  perfil = new Perfil();

  constructor(protected perfilService: PerfilService,
              protected location: Location,
              protected funcionalidadeService: FuncionalidadeService,
              protected alerta: AlertaService,
              protected rota: Router,
              protected rotaAtual: ActivatedRoute,
              protected loginService: LoginService,
              protected formBuilder: FormBuilder,
              ) {

    super(perfilService, location, alerta, loginService, rota);
  }

  ngOnInit() {
    if (this.alerta.bsModalRef == null) {
      console.log('entrou no if');
    }

    this.criarAtualizarForm(this.rotaAtual.snapshot.data['perfil']);
  }

  criarAtualizarForm(perfil: Perfil) {
    this.perfil = perfil;

    this.form = this.formBuilder.group({
      id: [ perfil.id ],
      nome: [ perfil.nome, [ Validators.required ] ]
    });

    if (this.rota.url.includes('novo')) {
        this.alerta.abrirModalAguarde('Aguarde...');
        this.funcionalidadeService.funcionalidadesComAcoes().subscribe( (response: any) => {
          this.perfil.funcionalidades = response;
          this.alerta.fechar();
        });
    }

    if (this.rota.url.includes('visualizar')) {
      this.form.disable();
    }
  }

  onSubmit() {

    if (this.form.valid) {
      this.perfil.nome = this.form.get('nome').value;
      if (this.form.get('id').value) {
        this.perfil.id = this.form.get('id').value;
      }

      this.salvar(this.perfil);
    }
  }

  escolheAcao(acao: Acao, posicaoFuncionalidade: number) {
    if (posicaoFuncionalidade == null) {
      return;
    }
    const funcionalidade = this.perfil.funcionalidades[posicaoFuncionalidade];
    let listaAcoes: Acao[];
    listaAcoes = funcionalidade['acoesSelecionadas'];

    if (acao['selecionado']) {
      listaAcoes.push(acao);
      return;
    }

    const tamanho = listaAcoes.length;

    for (let i = 0; i < tamanho; i++) {
      const acaoCadastrada = listaAcoes[i];

      if (acaoCadastrada['slug'] === acao['slug']) {
        listaAcoes.splice(i, 1);
        break;
      }
    }
  }
}
