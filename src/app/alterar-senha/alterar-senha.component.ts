import { CustomValidators } from 'ng2-validation';
import { AlertaService } from './../shared/alertas/alerta.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {
  form: FormGroup;
  alterarSenha: any = {};
  mensagemErro: string;

  constructor(private formBuild: FormBuilder,
              private http: HttpClient,
              private rota: Router,
              private rotaAtual: ActivatedRoute,
              private alerta: AlertaService) { }

  ngOnInit() {
    if (this.rotaAtual.snapshot.queryParams.email == null || this.rotaAtual.snapshot.queryParams.hash == null) {
      this.rota.navigate(['login']);
      return;
    }

    this.criarForm();
  }

  criarForm() {
    const password = new FormControl(null, [ Validators.required, Validators.minLength(6) ]);
    const passwordConfirmation = new FormControl(
      null,
      [
        Validators.required,
        CustomValidators.equalTo(password)
      ]
    );

    this.form = this.formBuild.group({
      email: [this.rotaAtual.snapshot.queryParams.email, [Validators.required, Validators.email]],
      password: password,
      password_confirmation: passwordConfirmation,
    });

    this.form.get('email').disable();
  }

  salvar() {
    if (this.form.valid) {
      this.alerta.abrirModalAguarde('Aguarde...');
      this.alterarSenha.token = this.rotaAtual.snapshot.queryParams.hash;
      this.alterarSenha.email = this.form.get('email').value;
      this.alterarSenha.password = this.form.get('password').value;
      this.alterarSenha.password_confirmation = this.form.get('password_confirmation').value;


      this.http.post(environment.API + 'api/auth/trocarsenha', this.alterarSenha).subscribe( (response: any) => {
        this.alerta.fechar();
        this.alerta.abrirModalSucesso(response.mensagem);
      }, data => {
        this.alerta.fechar();
        console.log(data);
        if (data.error != null && data.error.mensagem != null) {
          this.alerta.abrirModalErros(data.error.mensagem);
        }
      });
    }
  }

  voltar() {
    this.rota.navigate(['/login']);
  }

  limparFormulario() {
    this.form.reset();
  }
}
