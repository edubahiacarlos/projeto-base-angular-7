import { Subscribable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-dinamico',
  templateUrl: './checkbox-dinamico.component.html',
  styleUrls: ['./checkbox-dinamico.component.css']
})
export class CheckboxDinamicoComponent implements OnInit {
  @Input() lista: [];
  @Input() listaSelecionada: [];
  @Input() desabiliar =  false;
  @Output() testeApp = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      acoesPossiveis: this.buildAcoes()
    });

    if (this.desabiliar) {
      this.form.disable();
    }
  }

  buildAcoes() {

    if (this.lista == null) {
      return;
    }
    const valores = this.lista.map( (acaoPossivel: any) => {
      const selecionado = this.listaSelecionada.some( acaoSelecionada => {
        return acaoSelecionada['slug'] === acaoPossivel.slug;
      });

      return new FormControl(selecionado);
    });

    return this.formBuilder.array(valores);
  }

  abc(acao, posicao) {
    acao.selecionado = this.form.get('acoesPossiveis').value[posicao]
    return this.testeApp.emit(acao);
  }

}
