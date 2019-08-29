import { Component, OnInit, Input } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-alerta-info',
  templateUrl: './alerta-info.component.html',
  styleUrls: ['./alerta-info.component.css']
})
export class AlertaInfoComponent implements OnInit {
  @Input() mensagem: string;
  @Input() tipo: 'success';

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  fechar() {
    this.bsModalRef.hide();
  }

}
