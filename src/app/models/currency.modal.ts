export interface ICurrency {
    code: string;
    name: string;
    symbol: string;
}

export class Currency implements ICurrency {
    code!: string;
    name!: string;
    symbol!: string;
}