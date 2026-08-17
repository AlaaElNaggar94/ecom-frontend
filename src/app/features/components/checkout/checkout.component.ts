import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketService } from '../basket/basket.service'; // اضبط المسار المباشر لخدمتك
import { IBasket } from '../../../shared/models/BasketItem'; // اضبط المسار المباشر لنموذج السلة
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  basket$!: Observable<IBasket | null>;
  shippingFee: number = 10;
  isSubmitting: boolean = false;
  readonly baseUrl = environment.baseUrl;

  constructor(
    private fb: FormBuilder,
    private basketService: BasketService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.initCheckoutForm();
  }

  private initCheckoutForm(): void {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', Validators.required],
        state: ['', Validators.required]
      }),
      paymentForm: this.fb.group({
        paymentMethod: ['card', Validators.required]
      })
    });
  }

  get addressControls() {
    return (this.checkoutForm.get('addressForm') as FormGroup)?.controls || {};
  }

  getSubtotal(basket: IBasket): number {
    return basket.basketItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // الدالة التي يتم استدعاؤها من زر الـ HTML
  onPlaceOrder(): void {
    this.onSubmit();
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      this.toastr.warning('Please complete all required fields', 'Validation Error');
      return;
    }

    const basket = this.basketService.getCurrentBasketValue();
    if (!basket || basket.basketItems.length === 0) {
      this.toastr.error('Your cart is empty', 'Error');
      return;
    }

    this.isSubmitting = true;

    // محاكاة إرسال الطلب (يمكن ربطه بـ OrderService لاحقاً)
    setTimeout(() => {
      this.toastr.success('Your order has been placed successfully!', 'Order Confirmed');
      this.basketService.deleteBasket(basket.id);
      this.isSubmitting = false;
      this.router.navigateByUrl('/shop');
    }, 1500);
  }
}