import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent {
  @Input({ required: true }) paymentForm!: FormGroup;

  get paymentControls(): { [key: string]: AbstractControl } {
    return this.paymentForm.controls;
  }
}