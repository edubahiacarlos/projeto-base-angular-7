import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertaConfirmacaoService {
  eventoAcao = new EventEmitter<any>();

  constructor() { }
}
