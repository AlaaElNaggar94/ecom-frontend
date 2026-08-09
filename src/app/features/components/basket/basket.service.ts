import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  IBasket,
  IBasketItem,
  Basket,
} from './../../../shared/models/BasketItem'; // اضبط المسار حسب مشروعك
import { IProduct } from '../../../shared/models/Product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private baseUrl = environment.baseUrl;

  // BehaviorSubject للحفاظ على حالة السلة وبث والتفاعل مع أي تغيير
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) {}

  // جلب السلة الحالية المجهزة
  getCurrentBasketValue(): IBasket | null {
    return this.basketSource.value;
  }

  // 1. جلب السلة من الباك إند عند فتح التطبيق
  getBasket(id: string): Observable<IBasket> {
    return this.http
      .get<IBasket>(`${this.baseUrl}/api/Basket/get-basket-item/${id}`)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          return basket;
        }),
      );
  }

  // 2. إضافة أو تحديث السلة في الباك إند
  setBasket(basket: IBasket) {
    return this.http
      .post<IBasket>(`${this.baseUrl}/api/Basket/update-basket`, basket)
      .subscribe({
        next: (response) => {
          this.basketSource.next(response);
          localStorage.setItem('basket_id', response.id);
        },
        error: (error) => {
          console.error('Error updating basket:', error);
        },
      });
  }

  // 3. إضافة منتج للسلة (تُستدعى عند الضغط على Add To Cart)
  // السماح بمرور IProduct أو IBasketItem
  addItemToBasket(item: IProduct | IBasketItem, quantity = 1): void {
    const itemToAdd: IBasketItem = this.isProduct(item) 
      ? this.mapProductToBasketItem(item, quantity) 
      : item;

    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.basketItems = this.addOrUpdateItem(basket.basketItems, itemToAdd, quantity);
    this.setBasket(basket);
  }
  // addItemToBasket(item: IBasketItem, quantity = 1) {
  //   const itemToAdd: IBasketItem = this.mapProductToBasketItem(item, quantity);
  //   const basket = this.getCurrentBasketValue() ?? this.createBasket();
  //   basket.basketItems = this.addOrUpdateItem(
  //     basket.basketItems,
  //     itemToAdd,
  //     quantity,
  //   );
  //   this.setBasket(basket);
  // }

  // 4. زيادة الكمية
  incrementQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket) {
      const foundItemIndex = basket.basketItems.findIndex(
        (x) => x.id === item.id,
      );
      if (foundItemIndex !== -1) {
        basket.basketItems[foundItemIndex].quantity++;
        this.setBasket(basket);
      }
    }
  }

  // 5. تقليل الكمية أو الحذف إذا أصبحت 0
  decrementQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket) {
      const foundItemIndex = basket.basketItems.findIndex(
        (x) => x.id === item.id,
      );
      if (foundItemIndex !== -1) {
        if (basket.basketItems[foundItemIndex].quantity > 1) {
          basket.basketItems[foundItemIndex].quantity--;
          this.setBasket(basket);
        } else {
          this.removeItemFromBasket(item.id);
        }
      }
    }
  }

  // 6. حذف عنصر من السلة عبر الـ API
  removeItemFromBasket(id: number) {
    const basket = this.getCurrentBasketValue();
    if (basket) {
      const itemIndex = basket.basketItems.findIndex((x) => x.id === id);
      if (itemIndex !== -1) {
        basket.basketItems.splice(itemIndex, 1);

        if (basket.basketItems.length > 0) {
          this.setBasket(basket);
        } else {
          this.deleteBasket(basket.id);
        }
      }
    }
  }

  // 7. حذف السلة بالكامل
  deleteBasket(id: string) {
    return this.http
      .delete(`${this.baseUrl}/api/Basket/delete-basket-item/${id}`)
      .subscribe({
        next: () => {
          this.basketSource.next(null);
          localStorage.removeItem('basket_id');
        },
        error: (err) => console.error('Error deleting basket:', err),
      });
  }

  // --- Helper Methods ---

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number,
  ): IBasketItem[] {
    const index = items.findIndex((i) => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private mapProductToBasketItem(item: any, quantity: number): IBasketItem {
    return {
      id: item.id,
      name: item.name || item.productName,
      price: item.price || item.newPrice,
      description: item.description || item.productDescription,
      quantity,
      category: item.category || item.categoryName,
      image: item.photos[0].imageUrl ,
    };
  }

  // Type Guard للتأكد من نوع الكائن الممرر
  private isProduct(item: IProduct | IBasketItem): item is IProduct {
    return (item as IProduct).newPrice !== undefined;
  }
}
