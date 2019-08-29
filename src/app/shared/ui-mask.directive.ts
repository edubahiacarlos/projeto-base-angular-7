import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';



@Directive({
  selector: '[uiMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: UiMaskDirective,
    multi: true
  }]
})
export class UiMaskDirective implements ControlValueAccessor {
  onTouched: any;
  onChange: any;
  
  // tslint:disable-next-line: no-input-rename
  @Input() mascara: string;

  constructor(private el: ElementRef){
  }

  writeValue(value: any): void {
    if (value) {
      this.el.nativeElement.value = this.aplicarMascara(value);
    } else {
      this.el.nativeElement.value = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  @HostListener('keyup', ['$event']) 
  onKeyup($event: any) {
    let valor = $event.target.value.replace(/\D/g, '');

    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }

    let pad = this.mascara.replace(/\D/g, '').replace(/9/g, '_');
    if (valor.length <= pad.length) {
      this.onChange(valor);
    }

    $event.target.value = this.aplicarMascara(valor);
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    if ($event.target.value.length === this.mascara.length) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
  }

  /**
   * Aplica a máscara a determinado valor.
   *
   * @param string valor
   * @return string
   */
  aplicarMascara(valor: string): string {
    valor = valor.replace(/\D/g, '');
    let pad = this.mascara.replace(/\D/g, '').replace(/9/g, '_');
    let valorMask = valor + pad.substring(0, pad.length - valor.length);
    let valorMaskPos = 0;
    
    valor = '';
    for (let i = 0; i < this.mascara.length; i++) {
      if (isNaN(parseInt(this.mascara.charAt(i)))) {
        valor += this.mascara.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }
    
    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    return valor;
  }
}
