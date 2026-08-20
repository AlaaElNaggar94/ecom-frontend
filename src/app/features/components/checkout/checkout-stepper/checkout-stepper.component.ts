import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CdkStepper } from '@angular/cdk/stepper';
import { IDeliveryMethod } from '../../../../shared/models/checkout';

@Component({
  selector: 'app-checkout-stepper',
  templateUrl: './checkout-stepper.component.html',
  styleUrls: ['./checkout-stepper.component.scss'],
  // نضمن تسجيل المكون كـ CdkStepper ليعمل مباشرة مع Angular CDK
  providers: [{ provide: CdkStepper, useExisting: CheckoutStepperComponent }],
})
export class CheckoutStepperComponent extends CdkStepper {
  @Input({ required: true }) checkoutForm!: FormGroup;
  @Input() isSubmitting: boolean = false;
  @Input() isAddressLoading: boolean = false;

  // checkout-stepper.component.ts
  @Input() deliveryMethods: IDeliveryMethod[] = [];
  @Output() deliveryMethodSelected = new EventEmitter<number>();
  // الأحداث التي يتم إرسالها للـ CheckoutComponent لتنفيذ الـ APIs

  @Output() saveAddress = new EventEmitter<CdkStepper>();
  @Output() submitOrder = new EventEmitter<void>();

  @ViewChild('cdkStepper') cdkStepper!: CdkStepper;
  get addressForm(): FormGroup {
    return this.checkoutForm.get('addressForm') as FormGroup;
  }

  get deliveryForm(): FormGroup {
    return this.checkoutForm.get('deliveryForm') as FormGroup;
  }

  get paymentForm(): FormGroup {
    return this.checkoutForm.get('paymentForm') as FormGroup;
  }

  onDeliveryMethodSelected(price: number): void {
    this.deliveryMethodSelected.emit(price);
  }
  // عند الضغط على زر حفظ العنوان في step 1
  onAddressNext(appStepper: CdkStepper): void {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }
    this.saveAddress.emit(appStepper);
  }
  // 👈 إضافة كلمة override
  override next(): void {
    // كود إضافي إن وجد...
    super.next(); // استدعاء الدالة الأصلية في CdkStepper
  }

  override previous(): void {
    super.previous();
  }
  // عند الضغط على زر تأكيد الطلب النهائي في آخر step
  onCompleteOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    this.submitOrder.emit();
  }
}
