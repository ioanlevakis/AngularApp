import { Currency } from "./currency.modal";
import { Transaction } from "./transaction.model";

export interface IAccount {
    id: string;
    code: string;
    currency: Currency;
    name: string;
    description: string;
    balance: number;
    type: string;
    transactions?: Transaction[];
}

export class Account implements IAccount {
    id!: string;
    code!: string;
    currency!: Currency;
    name!: string;
    description!: string;
    balance!: number;
    type!: "Asset" | "Liability" | "Income" | "Expense" | "Equity" | "Debit" | "Credit";
    transactions?: Transaction[];
}