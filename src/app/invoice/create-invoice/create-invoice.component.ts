import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-invoice',
  imports: [ModalModule],
  providers: [BsModalService],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css'
})
export class CreateInvoiceComponent {
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
