import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BasketService } from '../../../features/components/basket/basket.service';
import { IBasketTotal } from '../../models/BasketItem';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  subtotal: number = 0;
  shippingFee: number = 0;
  @Input() baseUrl: string = '';
  @Input() basket: any = null;
  @Input() isSubmitting: boolean = false;

  // جعل الـ checkoutForm اختياري ليعمل في Basket و Checkout معاً
  @Input() checkoutForm?: FormGroup;

  basketTotal: number | null = null;
  private basketTotalSub!: Subscription;

  constructor(public basketService: BasketService) {}

  ngOnInit(): void {
    // الاشتراك في القيم القادمة من basketTotal$
    this.basketTotalSub = this.basketService.basketTotal$.subscribe({
      next: (totals) => {
        if (totals) {
          this.basketTotal = totals.total;
          this.subtotal = totals.subtotal;
          this.shippingFee = totals.shipping;
        }
      },
      error: (err) => console.error(err),
    });
  }

  ngOnDestroy(): void {
    // إلغاء الاشتراك عند تدمير الـ Component
    if (this.basketTotalSub) {
      this.basketTotalSub.unsubscribe();
    }
  }
}
