import { Account } from "./account.model";
import { Currency } from "./currency.modal";

export interface ITransaction {
    amount: number;
    creditAccount: Account;
    currency: Currency;
    date: Date;
    debitAccount: Account;
    description?: string;
    exchangeRate: number;
    id: string;
    linkedInvoiceId?: string;
    linkedPaymentId?: string;
    referenceCode: string;
    status: string;
}

export class Transaction implements ITransaction {
    amount!: number;
    creditAccount!: Account;
    currency!: Currency;
    date!: Date;
    debitAccount!: Account;
    description?: string;
    exchangeRate!: number;
    id!: string;
    linkedInvoiceId?: string;
    linkedPaymentId?: string;
    referenceCode!: string;
    status!: 'Pending' | 'Posted' | 'Cancelled';
}