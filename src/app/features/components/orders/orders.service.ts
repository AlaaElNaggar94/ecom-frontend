import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../../../shared/models/order';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = environment.baseUrl; // تأكد من البورت الخاص بك

  constructor(private http: HttpClient) {}

  // جلب كافة طلبات المستخدم الحالي
  getOrdersForUser(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.baseUrl + '/api/Order/get-all-orders-for-user');
  }

  // جلب تفاصيل طلب واحد برقم الـ ID
  getOrderDetailed(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(this.baseUrl + '/api/Order/get-order-by-id/' + id);
  }
}