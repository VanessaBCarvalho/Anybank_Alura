import { nanoid } from "nanoid";

export class Transacao {
    readonly id = nanoid();
    readonly data = new Date();
  static tipo: TipoTransacao;
    
    constructor(
        public readonly tipo: TipoTransacao,
        public readonly valor: number
    ){}
}


export enum TipoTransacao{
    DEPOSITO = 'Depósito',
    SAQUE = 'Saque'
}