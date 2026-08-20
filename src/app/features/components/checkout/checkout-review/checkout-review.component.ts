import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDeliveryMethod } from '../../../../shared/models/checkout';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent {
  @Input({ required: true }) deliveryMethods: IDeliveryMethod[]=[];
  @Input({ required: true }) checkoutForm!: FormGroup;
  @Input() isSubmitting: boolean = false;
}