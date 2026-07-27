import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
// import { ProductDTO, ProductResponseCustomDTO, ProductsService } from './backend/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit { // 👈 1. إمبلمنت لـ OnInit
  title = 'ecom-frontend';
  products: any[] = [];
  isLoading: boolean = true;

  // ******************

  // متغير لتخزين قائمة المنتجات
  // products: ProductResponseCustomDTO[] = [];
  // isLoading: boolean = false;
  // errorMessage: string = '';
  
  
  // private apiUrl = 'http://localhost:4321/api/Products/get-all';
  private apiUrl = `${environment.baseUrl}/api/Products/get-all`;

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    // private productsService: ProductsService
  ) { }

  // 👈 2. استدعاء الدالة عند بداية التحميل
  ngOnInit(): void {


    // this.getProducts();
    // 👈 الطلب مش هينزل غير لما المتصفح يفتح الصفحة
    if (isPlatformBrowser(this.platformId)) {
      this.getProducts();
    }

  // *********************
  // from swager 
  // this.loadProducts();
  }

  // 👈 3. تعديل نوع الـ Return إلى void
  getProducts(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (response) => {
        this.products = response;
        this.isLoading = false;
        console.log("response",response);
        
      },
      error: (err) => {
        console.error('حدث خطأ أثناء جلب البيانات:', err);
        this.isLoading = false;
      }
    });
  }

  // // from swagger 
  // loadProducts(): void {
  //   this.isLoading = true;
    
  //   // استدعاء دالة جلب كل المنتجات الموَّلدة من السواجر
  //   this.productsService.apiProductsGetAllGet().subscribe({
  //     next: (response) => {
  //       this.products = response;
  //       this.isLoading = false;
  //       console.log("Data from swagger :: --- > ",this.products);
        
  //     },
  //     error: (err) => {
  //       console.error('حدث خطأ أثناء جلب المنتجات:', err);
  //       this.errorMessage = 'عذراً، تعذر تحميل المنتجات حالياً.';
  //       this.isLoading = false;
  //     }
  //   });
  // }
}