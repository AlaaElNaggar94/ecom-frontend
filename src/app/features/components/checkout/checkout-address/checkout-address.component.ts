import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss'
})
export class CheckoutAddressComponent {
  @Input({ required: true }) addressForm!: FormGroup;
  @Input() isLoading: boolean = false;
  
  // إرسال الحدث للأب عند الضغط على Next
  @Output() saveAddress = new EventEmitter<void>();

  get addressControls(): { [key: string]: AbstractControl } {
    return this.addressForm.controls;
  }

  onNext(): void {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }
    // إرسال طلب حفظ البيانات للأب
    this.saveAddress.emit();
  }
}