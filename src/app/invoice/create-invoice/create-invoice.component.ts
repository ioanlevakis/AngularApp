import { Component, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { FormsModule, NgForm, } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Invoice } from '../../models/invoice.model';
import { Transaction } from '../../models/transaction.model';
import { Currency } from '../../models/currency.modal';
import { Account } from '../../models/account.model';


@Component({
  selector: 'app-create-invoice',
  providers: [BsModalService],
  imports: [FormsModule, ModalModule],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css'
})
export class CreateInvoiceComponent {

  parentModalRef?: BsModalRef;

  creditAccounts: Account[] = [
    {
      id: "1",
      code: "acc-001",
      name: "Sales Revenue",
      description: "Income from services rendered",
      balance: 5000,
      type: "Income",
      transactions: [],
      currency: { code: "USD", name: "US Dollar", symbol: "$" }
    },
    {
      id: "2",
      code: "acc-002",
      name: "Marketing Revenue",
      description: "Income from services rendered",
      balance: 10000,
      type: "Income",
      transactions: [],
      currency: { code: "EUR", name: "Euro", symbol: "€" }
    }
  ];


  invoice: Invoice = {
    code: "INV-2025-0001",
    currency: { code: "USD", name: "US Dollar", symbol: "$" },
    dateInserted: new Date(),
    dueDate: new Date("2025-05-31"),
    exchangeRate: 0.92,
    id: "900",
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
      id: "3",
      code: "acc-002",
      name: "Cash",
      description: "Cash account",
      balance: 3000,
      type: "Asset",
      transactions: [],
      currency: { code: "EUR", name: "Euro", symbol: "€" }
    },

    creditAccount: {} as Account
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

  onTableSelect(item: any) {
    this.invoice.creditAccount = item;
    this.hideChildModal();
  }


  createInvoice() {
    throw new Error('Method not implemented.');
  }


  @ViewChild('parentModal', { static: false }) parentModal?: ModalDirective;
  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;

  showParentModal(): void {
    this.parentModal?.show();
  }
  showChildModal(): void {
    this.childModal?.show();
  }

  hideParentModal(invoiceForm: NgForm): void {
    if (invoiceForm && invoiceForm.dirty) {
      if (confirm('You have unsaved changes. Close anyway?')) {
        this.parentModal?.hide();
        invoiceForm.reset();
      }
    } else {
      this.parentModal?.hide();
    }
  }
  hideChildModal(): void {
    this.childModal?.hide();
  }
}
