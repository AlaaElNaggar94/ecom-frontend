import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDeliveryMethod } from '../../../../shared/models/checkout';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss'
})
export class CheckoutDeliveryComponent {
  @Input({ required: true }) deliveryForm!: FormGroup;
  @Input({ required: true }) deliveryMethods: IDeliveryMethod[] = [];
  @Output() deliveryMethodSelected = new EventEmitter<number>();

  // إرسال تكلفة الشحن للمكون الأب لحديث الـ Subtotal
  setShippingPrice(deliveryMethod: IDeliveryMethod): void {
    this.deliveryMethodSelected.emit(deliveryMethod.price);
  }
}