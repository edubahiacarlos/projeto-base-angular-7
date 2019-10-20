import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Usuario } from './model/usuario.class';
import { ErroServidorService } from './shared/servico/erroServidor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'projeto-base';
  mostrarMenu = false;
  isCollapsed = true;
  @ViewChild('dropdown') dropdown: any;
  usuarioLogado: Usuario;
  listaControleAcesso: [];
  botao: {};

  constructor(private loginService: LoginService,
              private rota: Router,
              private erroService: ErroServidorService){
  }

  ngOnInit(): void {

    LoginService.logado.subscribe( mostrar => {
      this.mostrarMenu = mostrar;
      this.botao = {
        usuario: false,
        funcionalidade: false,
        perfil: false,
        acao: false
      };

      this.listaControleAcesso = JSON.parse(sessionStorage.getItem('controleAcesso'));
      this.verificaPermissaoUsuario();

      if (mostrar) {
        this.dropdown.show();
        this.buscarUsuarioLogado();
      } else {
        this.dropdown.hide();
      }
    });
  }

  verificaPermissaoUsuario() {
    if (this.listaControleAcesso != null) {
      const tamanho = this.listaControleAcesso.length;

      for (let i = 0; i < tamanho; i++) {
        const controle = this.listaControleAcesso[i];

        if (controle['slug'] != null && controle['acoes'] != null) {
          // tslint:disable-next-line: no-unused-expression
          let chave: string; 
          chave = controle['slug'];
          this.botao[chave] = true;
        }
      }
    }
  }

  sair() {
    this.loginService.sair().subscribe(
      () => {
        this.loginService.removerItensSessao();
        this.loginService.estaLogado();
        this.rota.navigate(['/login']);
      },
      error => {
        this.erroService.erro(error);
      }
    );
  }

  buscarUsuarioLogado() {
    this.usuarioLogado = this.loginService.usuarioLogado();
    return this.usuarioLogado;
  }
}
