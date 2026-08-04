import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem }  from './../../../shared/models/BasketItem'; // اضبط مسار ה-Model لديك
import { BasketService } from './basket.service'; // اضبط مسار الـ Service لديك

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  shippingCost = 30;
  basket$!: Observable<IBasket | null>;

  constructor(public basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  // Calculate Subtotal
  getSubtotal(basket: IBasket): number {
    return basket.basketItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // Calculate Total Items Count
  getTotalCount(basket: IBasket): number {
    return basket.basketItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  // Calculate Total Price
  getTotal(basket: IBasket): number {
    const subtotal = this.getSubtotal(basket);
    return subtotal > 0 ? subtotal + this.shippingCost : 0;
  }

  // Increment Quantity via API
  incrementQuantity(item: IBasketItem): void {
    this.basketService.incrementQuantity(item);
  }

  // Decrement Quantity via API
  decrementQuantity(item: IBasketItem): void {
    this.basketService.decrementQuantity(item);
  }

  // Remove Single Item via API
  removeItem(id: number): void {
    this.basketService.removeItemFromBasket(id);
  }

  // Clear Entire Basket via API
  clearBasket(basketId: string): void {
    this.basketService.deleteBasket(basketId);
  }
}