import { AlertaEsqueciSenhaComponent } from './alerta-esqueci-senha/alerta-esqueci-senha.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Login } from './login.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AlertaService } from '../shared/alertas/alerta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  login: Login;
  bsModalRef: BsModalRef;

  constructor(private formBuilder: FormBuilder,
              private rota: Router,
              private modalService: BsModalService,
              private loginService: LoginService,
              private alerta: AlertaService) { }

  ngOnInit() {
    this.bsModalRef = new BsModalRef();
    this.criarFormulario();
  }

  criarFormulario() {
    this.formulario = this.formBuilder.group({
      email: [null, [ Validators.required, Validators.email ]],
      password: [null, [ Validators.required ]]
    });
  }

  logar() {
    if (this.formulario.valid) {
      this.alerta.abrirModalAguarde('Carregando...');

      this.login = this.formulario.value;
      this.loginService.fazerLogin(this.login).subscribe(
        response => {

          this.loginService.adicionarItensSessao(response);
          this.loginService.estaLogado();
          this.formulario.reset();
          this.rota.navigate(['/inicio']);
          this.alerta.fechar();
         // this.alerta.abrirModalSucesso(response['mensagem']);
        },
        data => {
          this.alerta.fechar();
          this.alerta.abrirModalErros(data.error.mensagem);
          this.loginService.removerItensSessao();
          this.loginService.estaLogado();
        }
      );
    }
  }

  verificarErros(campo: string) {
    if (this.formulario.get(campo) && this.formulario.get(campo).errors) {
      return this.formulario.get(campo).errors;
    }
    return false;
  }

  esqueciSenha() {
    this.bsModalRef = this.modalService.show(AlertaEsqueciSenhaComponent, {
      ignoreBackdropClick: true
    });
  }
}
