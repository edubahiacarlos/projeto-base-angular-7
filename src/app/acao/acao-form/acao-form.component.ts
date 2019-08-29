import { Acao } from './../../model/Acao.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../../login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertaService } from './../../shared/alertas/alerta.service';
import { AcaoService } from './../acao.service';
import { CrudComponenteForm } from './../../shared/crud/crud-componente-form.class';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-acao-form',
  templateUrl: './acao-form.component.html',
  styleUrls: ['./acao-form.component.css']
})
export class AcaoFormComponent extends CrudComponenteForm implements OnInit {
  form: FormGroup;

  constructor(protected acaoService: AcaoService,
              protected location: Location,
              protected alerta: AlertaService,
              protected rota: Router,
              protected rotaAtual: ActivatedRoute,
              protected loginService: LoginService,
              protected formBuilder: FormBuilder,
              ) {

    super(acaoService, location, alerta, loginService, rota);
  }

  ngOnInit() {
    this.criarOuAtualizarForm(this.rotaAtual.snapshot.data.acao);
  }

  criarOuAtualizarForm(acao: Acao) {
    this.form = this.formBuilder.group({
      id: [acao.id],
      nome: [acao.nome, [Validators.required]]
    });

    if (this.rota.url.includes('visualizar')) {
      this.form.disable();
    }
  }

  submit() {
    if (this.form.valid) {
      this.salvar(this.form.value);
    }
  }

}
