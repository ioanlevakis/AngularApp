import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule, } from '@angular/forms';
import { Invoice } from '../../models/invoice.model';
import { Transaction } from '../../models/transaction.model';


@Component({
  selector: 'app-create-invoice',
  providers: [BsModalService],
  imports: [FormsModule],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css'
})
export class CreateInvoiceComponent {
  modalRef?: BsModalRef;

  // invoice: Invoice={
  //   code: "",
  //   creditAccount: { 
  //     id: string;
  //       code: string;
  //       name: string;
  //       description: string;
  //       balance: number;
  //       type: string;
  //       transactions: Transaction[];},
  //   currency: {code: string;
  //     name: string;
  //     symbol: string;},
  //   dateInserted: new Date(),
  //   debitAccount: { id: string;
  //       code: string;
  //       name: string;
  //       description: string;
  //       balance: number;
  //       type: string;
  //       transactions: Transaction[];},
  //   dueDate: new Date(),
  //   exchangeRate: 0,
  //   id: "",
  //   issueDate: new Date(),
  //   items: [{amount: number;
  //     description: string;
  //     quantity: number;
  //     type: string;
  //     unitPrice: number;}],
  //   remarks: "",
  //   status: "",
  //   totalAmount: 0
  // }


  invoice: Invoice = {
    code: "INV-2025-0001",
    currency: { code: "USD", name: "US Dollar", symbol: "$" },
    dateInserted: new Date(),
    dueDate: new Date("2025-05-31"),
    exchangeRate: 0.92,
    id: "inv-001",
    issueDate: new Date(),
    items: [
      {
        amount: 1200,
        description: "Web development service",
        quantity: 1,
        type: "Debit",
        unitPrice: 1200
      },
      {
        amount: 600,
        description: "Consulting hours",
        quantity: 2,
        type: "Credit",
        unitPrice: 300
      }
    ],
    remarks: "Client preferred USD payment.",
    status: "Pending",
    totalAmount: 1800,

    debitAccount: {
      id: "acc-002",
      code: "1000",
      name: "Cash",
      description: "Cash account",
      balance: 3000,
      type: "Asset",
      transactions: []
    },

    creditAccount: {
      id: "acc-001",
      code: "4000",
      name: "Sales Revenue",
      description: "Income from services rendered",
      balance: 5000,
      type: "Income",
      transactions: []
    }
  };

  transaction: Transaction = {
    id: "txn-001",
    referenceCode: "TXN-2025-0001",
    date: new Date(),
    debitAccount: this.invoice.debitAccount,
    creditAccount: this.invoice.creditAccount,
    amount: this.invoice.totalAmount,
    currency: this.invoice.currency,
    exchangeRate: this.invoice.exchangeRate,
    description: "Invoice Payment",
    linkedInvoiceId: this.invoice.id,
    status: "Posted"
  };

  constructor(private modalService: BsModalService) {
    this.invoice.debitAccount.transactions = [this.transaction];
    this.invoice.creditAccount.transactions = [this.transaction];
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
  createInvoice() {
    throw new Error('Method not implemented.');
  }
}
