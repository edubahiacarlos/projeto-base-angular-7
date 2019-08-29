import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

enum MostrarConteudo {
  MENSAGEM = 'mensagem',
  IMAGEM = 'imagem'
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'exibicao-validacao',
  templateUrl: './exibicao-validacao.component.html',
  styleUrls: ['./exibicao-validacao.component.css']
})
export class ExibicaoValidacaoComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() campo: string;
  @Input() mostrar: string;

  mensagem: string;
  mensagemValidacao = {
    required: 'Campo Obrigatório.',
    email: 'Informe um email válido.',
    minlength: 'Número de caracteres inferior ao permitido.',
    maxlength: 'Número máximo de caracteres excedidos.',
    cpfInvalido: 'CPF Inválido.',
    equalTo: 'O campo deve ser igual ao campo anterior'
  };

  constructor() { }

  ngOnInit() {
  }

  verificaErros(campo: string, form: FormGroup, tipoValidacao: string) {
    if (form && form.get(campo).errors && form.get(campo).errors[tipoValidacao]) {
      return this.mensagemValidacao[tipoValidacao];
    }

    return this.mensagem;
  }

  campoValido(campo: string, form: FormGroup) {
    if (form && form.get(campo).errors) {
      return false;
    }

    return true;
  }

  teste(form: FormGroup) {
    if (form && form.get('emailConfirmacao').errors) {
    }
  }
}
