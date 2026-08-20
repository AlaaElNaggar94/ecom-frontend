import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketService } from '../basket/basket.service';
import { IdentityService } from '../identity/identity.service';
import { CheckoutService } from './checkout.service';
import { IBasket } from '../../../shared/models/BasketItem';
import { CheckoutStepperComponent } from './checkout-stepper/checkout-stepper.component';
import { environment } from '../../../../environments/environment';
import { IAddress, IOrderToCreate } from '../../../shared/models/order';
import { CdkStepper } from '@angular/cdk/stepper';
import { IDeliveryMethod } from '../../../shared/models/checkout';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  @ViewChild(CheckoutStepperComponent) appStepper!: CheckoutStepperComponent;

  checkoutForm!: FormGroup;
  basket$!: Observable<IBasket | null>;
  shippingFee: number = 0;
  readonly baseUrl = environment.baseUrl; // السطر المفقود 1
  deliveryMethods: IDeliveryMethod[] = [];
  // Loading States
  isSubmitting: boolean = false;
  isAddressLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private basketService: BasketService,
    private accountService: IdentityService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.initCheckoutForm();
    this.populateFormWithUserData();
    this.getDeliveryMethods();
  }

  private initCheckoutForm(): void {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', Validators.required],
        state: ['', Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethodId: ['', Validators.required],
      }),
      paymentForm: this.fb.group({
        paymentMethod: ['card', Validators.required],
      }),
    });
  }
  // ملء الفورم مسبقاً بعنوان المستخدم من السيرفر إذا كان موجوداً

  getDeliveryMethods(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: (methods) => (this.deliveryMethods = methods),
      error: (err) => console.error('Failed to fetch delivery methods', err),
    });
  }

// خيار 2: إذا كنت تمرر فقط رقم السعر (deliveryFee)
  onDeliveryMethodSelected(deliveryFee: number): void {
    this.shippingFee = deliveryFee;
    this.basketService.setShippingPrice(deliveryFee);
  }

  private populateFormWithUserData(): void {
    this.accountService.getUserAddress().subscribe({
      next: (address: IAddress) => {
        if (address) {
          this.checkoutForm.get('addressForm')?.patchValue(address);
        }
      },
      error: (err) => console.error('Failed to load address', err),
    });
  }


  // Step 1 API Call: حفظ العنوان
  onSaveAddress(appStepper: CdkStepper): void {
    const addressFormGroup = this.checkoutForm.get('addressForm');

    if (addressFormGroup?.invalid) {
      addressFormGroup.markAllAsTouched();
      this.toastr.warning(
        'Please complete all required address fields',
        'Validation Error',
      );
      return;
    }

    this.isAddressLoading = true;
    const addressData = addressFormGroup?.value;

    this.accountService.updateUserAddress(addressData).subscribe({
      next: () => {
        this.isAddressLoading = false;
        this.toastr.success('Address saved successfully', 'Success');
        appStepper.next();
      },
      error: (err: any) => {
        this.isAddressLoading = false;
        this.toastr.error('Failed to save address', 'Error');
      },
    });
  }



  // الدالة المفقودة 3: Alias لـ submitOrder للتوافق مع onSubmit
  onSubmit(): void {
    this.submitOrder();
  }

  // Final Step API Call: إنشاء الطلب ومسح السلة
  submitOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      this.toastr.warning(
        'Please complete all required fields',
        'Validation Error',
      );
      return;
    }

    const basket = this.basketService.getCurrentBasketValue();
    if (!basket || !basket.basketItems || basket.basketItems.length === 0) {
      this.toastr.error('Your cart is empty', 'Error');
      return;
    }

    this.isSubmitting = true;

    const orderToCreate :IOrderToCreate = {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm.deliveryMethodId')
        ?.value,
      shippingAddress: this.checkoutForm.get('addressForm')?.value,
    };

    console.log("orderToCreate",orderToCreate);
    
    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: (order: any) => {
        this.toastr.success('Order created successfully', 'Order Confirmed');
        this.basketService.deleteBasket(basket.id);
        this.isSubmitting = false;
        this.router.navigateByUrl('/checkout/success');
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.toastr.error(
          err.error?.message || 'Order creation failed',
          'Error',
        );
      },
    });
  }
}
