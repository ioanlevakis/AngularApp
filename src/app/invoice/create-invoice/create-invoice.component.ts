import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BsModalService, ModalDirective, } from 'ngx-bootstrap/modal';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormsModule, NgForm, NgModel, } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Invoice } from '../../models/invoice.model';
import { Transaction } from '../../models/transaction.model';
import { Account } from '../../models/account.model';
import { DatePipe, } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-create-invoice',
  standalone: true,
  providers: [BsModalService, provideAnimations()],
  imports: [FormsModule, ModalModule, DatePipe, BsDatepickerModule],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css',
})
export class CreateInvoiceComponent {
  resetForm() {
    this.invoiceForm?.reset();
    // this.invoice = {} as Invoice;
    this.transactionTouched = false;

    this.invoice.debitAccount = {} as Account;
    this.invoice.creditAccount = {} as Account;
  }
  deleteInvoice(event: MouseEvent, invoiceToDelete: Invoice) {
    event.stopPropagation();
    this.invoiceItems = this.invoiceItems.filter(invoice => invoice !== invoiceToDelete);
    this.invoice = {} as Invoice;
    this.invoiceForm?.reset();
  }

  @ViewChild('invoiceForm') invoiceForm: NgForm | undefined;

  datepickerConfig = {
    dateInputFormat: 'DD/MM/YYYY',
    containerClass: 'theme-dark-blue',
    isAnimated: false,
    showWeekNumbers: true,
    showTodayButton: true,
    initCurrentTime: true,
    showTimepicker: false,
  };

  selectType(transactionType: string) {
    if (transactionType === "Credit") {
      this.isCredit = true;
      this.isDebit = false;
      this.debitAccountControl?.reset();
      this.invoice.debitAccount = {} as Account;
    }
    else {
      this.isCredit = false;
      this.isDebit = true;
      this.creditAccountControl?.reset();
      this.invoice.creditAccount = {} as Account;
    }

    this.exchangeRateControl?.reset();
    this.transactionTouched = true;
  }

  invoiceItems: Invoice[] = [];
  accountItems: Account[] = [];

  isCredit!: boolean;
  isDebit!: boolean;

  transactionTouched!: boolean;

  constructor(private cdr: ChangeDetectorRef) {
    this.invoice.debitAccount.transactions = [this.transaction];
    this.invoice.creditAccount.transactions = [this.transaction];
  }

  @ViewChild('creditAccountControl') creditAccountControl!: NgModel;
  @ViewChild('debitAccountControl') debitAccountControl!: NgModel;
  @ViewChild('exchangeRateControl') exchangeRateControl!: NgModel;


  onTableSelect(item: any) {
    if (item.type === "Debit") {
      this.invoice.debitAccount = item;
      this.invoice.type = 'Debit';
      this.debitAccountControl.control.markAsDirty();
    } else {
      this.invoice.creditAccount = item;
      this.invoice.type = 'Credit';
      this.creditAccountControl.control.markAsDirty();
    }
    this.invoice.currency.symbol = item.currency.symbol;
    this.hideChildModal();
  }


  createInvoice(invoiceForm: NgForm) {
    this.invoice.id += this.invoice.code;
    const newInvoice: Invoice = { ...this.invoice }
    this.invoiceItems = [...this.invoiceItems, newInvoice];
    invoiceForm.reset();
    this.transactionTouched = false;

    this.invoice.debitAccount = {} as Account;
    this.invoice.creditAccount = {} as Account;
    // this.invoice = {} as Invoice;

    // this.invoice.debitAccount = {} as Account;
    // this.invoice.creditAccount = {} as Account;
  }


  @ViewChild('parentModal', { static: false }) parentModal?: ModalDirective;
  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;

  showParentModal(): void {
    this.invoice.dateInserted = new Date();
    this.parentModal?.show();
    console.log(this.accountItems);
  }
  showChildModal(): void {
    this.childModal?.show();
  }

  showCreditAccountsModal() {
    this.accountItems = [...this.creditAccounts];
    this.cdr.detectChanges(); // Force UI update
    this.showChildModal();
  }
  showDebitAccountsModal() {
    this.accountItems = [...this.debitAccounts];
    this.cdr.detectChanges(); // Force UI update
    this.showChildModal();
  }

  hideParentModal(invoiceForm: NgForm): void {
    if (invoiceForm && invoiceForm.dirty) {
      if (confirm('You have unsaved changes. Close anyway?')) {
        this.parentModal?.hide();
        invoiceForm.reset();
        this.transactionTouched = false;
      }
    } else {
      this.parentModal?.hide();
      this.transactionTouched = false;
    }
  }
  hideChildModal(): void {
    this.childModal?.hide();
  }


  onInvoiceSelect(tableItem: Invoice) {
    this.invoice = { ...tableItem };
  }


  creditAccounts: Account[] = [
    {
      id: "1",
      code: "acc-001",
      name: "Sales Revenue",
      description: "Income from services rendered",
      balance: 5000,
      type: "Credit",
      transactions: [],
      currency: { code: "USD", name: "US Dollar", symbol: "$" }
    },
    {
      id: "2",
      code: "acc-002",
      name: "Marketing Revenue",
      description: "Income from services rendered",
      balance: 10000,
      type: "Credit",
      transactions: [],
      currency: { code: "EUR", name: "Euro", symbol: "€" }
    }
  ];
  debitAccounts: Account[] = [
    {
      id: "3",
      code: "acc-003",
      name: "Cash",
      description: "Cash account",
      balance: 2500,
      type: "Debit",
      transactions: [],
      currency: { code: "EUR", name: "Euro", symbol: "€" }
    },
    {
      id: "4",
      code: "acc-004",
      name: "eCash",
      description: "Bank of Greece account",
      balance: 600,
      type: "Debit",
      transactions: [],
      currency: { code: "EUR", name: "Euro", symbol: "€" }
    }
  ]

  invoice: Invoice = {
    code: "INV-2025-0001",
    currency: { code: "USD", name: "US Dollar", symbol: "$" },
    dateInserted: null,
    dueDate: new Date("2025-05-31"),
    exchangeRate: 0.92,
    id: "900",
    issueDate: null,
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

    debitAccount: {} as Account,

    creditAccount: {} as Account,
    type: ''
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
}
