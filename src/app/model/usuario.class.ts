import { Endereco } from './endereco';

export class Usuario {
    id: number;
    name: string;
    sobrenome: string;
    email; string;
    emailConfirmacao: string;
    tel_celular: string;
    tel_fixo: string;
    cpf: string;
    endereco = new Endereco();
    perfil: {};
}
