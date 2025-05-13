export interface IInvoiceItem {
    amount: number;
    description: string;
    quantity: number;
    type: string;
    unitPrice: number;
}

export class InvoiceItem implements IInvoiceItem {
    amount!: number;
    description!: string;
    quantity!: number;
    type!: 'Debit' | 'Credit';
    unitPrice!: number;
}