import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
  @Input() basket: any = null;
  @Input() subtotal: number = 0;
  @Input() shippingFee: number = 0;
  @Input() baseUrl: string = '';
  @Input() isSubmitting: boolean = false;
  @Input({ required: true }) checkoutForm!: FormGroup;
}