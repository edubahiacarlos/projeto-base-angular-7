import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-alerta-aguarde',
  templateUrl: './alerta-aguarde.component.html',
  styleUrls: ['./alerta-aguarde.component.css']
})
export class AlertaAguardeComponent implements OnInit {
  @Input() mensagem: 'string';
  @Input() tipo: 'success';

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  fechar() {
    this.bsModalRef.hide();
  }

}
