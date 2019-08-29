import { LoginService } from './../../login/login.service';
import { PerfilService } from './../../perfil/perfil.service';
import { Endereco } from './../../model/endereco';
import { ExibicaoValidacaoService } from './../../shared/exibicao-validacao/exibicao-validacao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertaService } from './../../shared/alertas/alerta.service';
import { UsuarioService } from './../usuario.service';
import { ValidacaoForm } from './../../shared/validacao-form/validacao-form';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Usuario } from '../../model/usuario.class';
import {Location} from '@angular/common';
import { CustomValidators } from 'ng2-validation';
import { CrudComponenteForm } from './../../shared/crud/crud-componente-form.class';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent extends CrudComponenteForm implements OnInit {
  form: FormGroup;
  exibicaoValidacao: ExibicaoValidacaoService;
  abc: any[];

  constructor(private formBuild: FormBuilder,
              protected perfilService: PerfilService,
              protected usarioService: UsuarioService,
              protected rota: Router,
              protected loginService: LoginService,
              protected location: Location,
              private rotaAtual: ActivatedRoute,
              protected alerta: AlertaService) {
    super(usarioService, location, alerta, loginService, rota);
  }

  ngOnInit() {
    this.perfilService.dadosPerfilDominio().subscribe( response => {
      this.abc = response;
    });
    this.criarOuAtualizarForm(this.rotaAtual.snapshot.data['usuario']);
  }

  criarOuAtualizarForm(usuario: Usuario) {

    if (usuario.id) {
      usuario.emailConfirmacao = usuario.email;

      if (usuario.endereco == null ) {
        usuario.endereco = new Endereco();
      }
    }

    const email = new FormControl(usuario.email, [ Validators.required, Validators.email ]);
    const confirmacaoEmail = new FormControl(
      usuario.emailConfirmacao,
      [
        Validators.required,
        Validators.email,
        CustomValidators.equalTo(email)
      ]
    );

    this.form = this.formBuild.group({
      id: [usuario.id],
      name: [usuario.name, [Validators.required, Validators.minLength(3)]],
      sobrenome: [usuario.sobrenome, [Validators.required]],
      email: email,
      emailConfirmacao: confirmacaoEmail,
      cpf: [usuario.cpf, [Validators.required, ValidacaoForm.cpfValidacao, Validators.maxLength(11)]],
      tel_fixo: [usuario.tel_fixo, [Validators.required, Validators.maxLength(10)]],
      tel_celular: [usuario.tel_celular, [Validators.required, Validators.maxLength(16)]],
      perfil: [usuario.perfil, [Validators.required ]],

      endereco: this.formBuild.group({
        id: [usuario.endereco.id],
        cep: [usuario.endereco.cep, [Validators.required, Validators.maxLength(8)]],
        rua: [usuario.endereco.rua, [ Validators.required ]],
        numero: [ usuario.endereco.numero ],
        complemento: [usuario.endereco.complemento],
        bairro: [usuario.endereco.bairro, [Validators.required]],
        cidade: [usuario.endereco.cidade, [Validators.required]],
        estado: [usuario.endereco.estado, [Validators.required]]
      }),
    });

    this.bloqueaCamposDeEndereco(usuario);

    if (this.rota.url.includes('visualizar')) {
      this.form.disable();
    }
  }

  bloqueaCamposDeEndereco(usuario: Usuario) {
    if (usuario.id) {
      this.form.get('endereco').disable();
      this.form.get('endereco.cep').enable();
      this.form.get('endereco.complemento').enable();
      this.form.get('endereco.numero').enable();
    }
  }

  consultaCep() {
    const cep: string = this.form.get('endereco.cep').value;

    if (cep.length === 8) {
      this.usarioService.getOutrasApi('https://viacep.com.br/ws/' + cep + '/json/').subscribe( response => {
        this.form.get('endereco.cidade').setValue(response['localidade']);
        this.form.get('endereco.cidade').disable();

        this.form.get('endereco.estado').setValue(response['uf']);
        this.form.get('endereco.estado').disable();

        this.form.get('endereco.bairro').setValue(response['bairro']);
        this.form.get('endereco.bairro').disable();

        this.form.get('endereco.rua').setValue(response['logradouro']);
      });
    }
  }

  submit() {
    if (this.form.valid) {
      this.form.enable();
      const usuario: Usuario = this.form.value;
      this.salvar(usuario);
    }
  }

  comparar(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome) : obj1 === obj2;
  }
}
