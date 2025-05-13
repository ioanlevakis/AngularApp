import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateInvoiceComponent } from "./invoice/create-invoice/create-invoice.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateInvoiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularApp';
}
