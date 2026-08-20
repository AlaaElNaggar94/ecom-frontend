import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { IOrder, IOrderToCreate } from '../../../shared/models/order';
import { IDeliveryMethod } from '../../../shared/models/checkout';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // 1. جلب قائمة طرق الشحن المتاحة لترتيبها حسب السعر/السرعة
  getDeliveryMethods(): Observable<IDeliveryMethod[]> {
    return this.http
      .get<IDeliveryMethod[]>(`${this.baseUrl}/api/Order/get-delivery-methods`)
      .pipe(
        map((dm: IDeliveryMethod[]) => {
          return dm.sort((a, b) => b.price - a.price);
        }),
      );
  }

  // 2. إرسال الطلب النهائي للـ Backend
  createOrder(order: IOrderToCreate): Observable<IOrder> {
    return this.http.post<IOrder>(`${this.baseUrl}/api/Order/create-order`, order);
  }
}
