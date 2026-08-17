import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss'
})
export class CheckoutAddressComponent {
  @Input({ required: true }) addressForm!: FormGroup;

  // Getter للوصول للمدخلات بشكل أسهل من الـ HTML بدون الحاجة لـ Input منفصل
  get addressControls(): { [key: string]: AbstractControl } {
    return this.addressForm.controls;
  }
}