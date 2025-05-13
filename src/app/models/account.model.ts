import { Transaction } from "./transaction.model";

export interface IAccount {
    id: string;
    code: string;
    name: string;
    description: string;
    balance: number;
    type: string;
    transactions?: Transaction[];
}

export class Account implements IAccount {
    id!: string;
    code!: string;
    name!: string;
    description!: string;
    balance!: number;
    type!: "Asset" | "Liability" | "Income" | "Expense" | "Equity";
    transactions?: Transaction[];
}