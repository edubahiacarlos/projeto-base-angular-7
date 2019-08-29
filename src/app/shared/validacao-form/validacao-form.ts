import { FormControl } from '@angular/forms';

export class ValidacaoForm {

    static cpfValidacao(controle: FormControl) {
        const cpf = controle.value;
        let soma = 0;
        let resto: number;

        // tslint:disable-next-line: prefer-const
        let objRetornoErro = { cpfInvalido: true };

        if (!cpf || cpf === '') {
            return null;
        }

        if (cpf.length !== 11) {
            return objRetornoErro;
        }

        if (cpf === '00000000000'
        || cpf === '11111111111'
        || cpf === '22222222222'
        || cpf === '33333333333'
        || cpf === '44444444444'
        || cpf === '55555555555'
        || cpf === '66666666666'
        || cpf === '77777777777'
        || cpf === '88888888888'
        || cpf === '99999999999') {
            return objRetornoErro;
        }

        for (let i = 1; i <= 9; i++) {
            // tslint:disable-next-line: radix
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }

        // tslint:disable-next-line: radix
        if (resto !== parseInt(cpf.substring(9, 10))) {
            return objRetornoErro;
        }

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            // tslint:disable-next-line: radix
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }

        // tslint:disable-next-line: radix
        if (resto !== parseInt(cpf.substring(10, 11))) {
            return objRetornoErro;
        }
        return null;
    }
}
