import { AlertaService } from './../../shared/alertas/alerta.service';
import { LoginService } from 'src/app/login/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alerta-esqueci-senha',
  templateUrl: './alerta-esqueci-senha.component.html',
  styleUrls: ['./alerta-esqueci-senha.component.css']
})
export class AlertaEsqueciSenhaComponent implements OnInit {
  formulario: FormGroup;
  aguarde = false;
  mensagemErro: string;

  constructor(private loginService: LoginService,
              private bsModalRef: BsModalRef,
              private alerta: AlertaService,
              private formBuild: FormBuilder) { }

  ngOnInit() {
    this.formulario = this.formBuild.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  fechar() {
    this.bsModalRef.hide();
  }

  salvar() {
    if (this.formulario.valid) {
      this.aguarde = true;
      let dados: any;
      dados = this.formulario.value;
      dados.urlAPI = environment.API;

      this.loginService.trocarSenha(dados).subscribe(response => {
        this.aguarde = false;
        this.bsModalRef.hide();
        this.alerta.abrirModalSucesso(response.mensagem);
      }, data => {
        this.aguarde = false;
        if (data.error.mensagem) {
          this.mensagemErro = data.error.mensagem;
        } else {
          this.mensagemErro = data.message;
        }
      });
    }
  }
}
