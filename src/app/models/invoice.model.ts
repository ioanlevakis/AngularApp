import { Account } from "./account.model";
import { Currency } from "./currency.modal";
import { InvoiceItem } from "./invoice-item.model";

export interface IInvoice {
    code: string;
    creditAccount: Account;
    currency: Currency;
    dateInserted: Date | null;
    debitAccount: Account;
    dueDate: Date;
    exchangeRate: number;
    id: string;
    issueDate: Date | null;
    items: InvoiceItem[];
    remarks?: string;
    status: string;
    totalAmount: number;
    type: string;
}


export class Invoice implements IInvoice {
    // id: string;
    // code: string;
    // issueDate: Date;
    // dueDate: Date;
    // currency: Currency;
    // exchangeRate: number;
    // debitAccount: Account;
    // creditAccount: Account;
    // items: InvoiceItem[];
    // totalAmount: number;
    // remarks?: string;
    // status: string;
    // dateInserted: Date;
    constructor(
        public code: string,
        public creditAccount: Account,
        public currency: Currency,
        public dateInserted: Date | null,
        public debitAccount: Account,
        public dueDate: Date,
        public exchangeRate: number,
        public id: string,
        public issueDate: Date | null,
        public items: InvoiceItem[],
        public status: string,
        public totalAmount: number,
        public type: string,
        public remarks?: string,
    ) {
        // if (obj) {
        //     this.code = obj.code;
        //     this.creditAccount = obj.creditAccount;
        //     this.currency = obj.currency;
        //     this.dateInserted = obj.dateInserted;
        //     this.debitAccount = obj.debitAccount;
        //     this.dueDate = obj.dueDate;
        //     this.exchangeRate = obj.exchangeRate;
        //     this.id = obj.id;
        //     this.issueDate = obj.issueDate;
        //     this.items = obj.items;
        //     this.remarks = obj.remarks;
        //     this.status = obj.status;
        //     this.totalAmount = obj.totalAmount;
        // }
    }


}