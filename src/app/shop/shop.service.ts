import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProduct } from '../shared/models/Product';
import { ICategory } from '../shared/models/Category'; // 👈 استيراد الـ Interface
import { IPaginatedResponse } from '../shared/models/PaginatedResponse';
import { SKIP_LOADING } from '../core/interceptors/loading.interceptor';

export class ShopParams {
  categoryId: number = 0; // 0 تعني "الكل" (All)
  sort: string = 'name';
  pageNumber: number = 1;
  pageSize: number = 6;
  search: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // دالة جلب المنتجات
  getProducts(
    shopParams: ShopParams,
    searchFlag:boolean
  ): Observable<IPaginatedResponse<IProduct>> {
    let params = new HttpParams();

    if (shopParams.sort) {
      params = params.append('Sort', shopParams.sort);
    }

    if (shopParams.categoryId && shopParams.categoryId !== 0) {
      params = params.append('CategoryId', shopParams.categoryId.toString());
    }

    if (shopParams.search) {
      params = params.append('Search', shopParams.search);
    }

    params = params.append('pageSize', shopParams.pageSize.toString());
    params = params.append('PageNumber', shopParams.pageNumber.toString());
if (searchFlag) {
     return this.http.get<IPaginatedResponse<IProduct>>(
      `${this.baseUrl}/api/Products/get-all-custom`,
      { params,
        context: new HttpContext().set(SKIP_LOADING, true) // 👈 إيقاف ظهور السبنر لهذا الـ Request
      },
    );
}else{
   return this.http.get<IPaginatedResponse<IProduct>>(
      `${this.baseUrl}/api/Products/get-all-custom`,
      { params },
    );
}
 
  }

  // 👈 دالة جلب الأقسام من الـ API المعروض في الصورة
  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.baseUrl}/api/Categories/get-all`);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/api/Products/get-by-id/${id}`);
  }
}
