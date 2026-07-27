import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit { // 👈 1. إمبلمنت لـ OnInit
  title = 'ecom-frontend';
  products: any[] = [];
  isLoading: boolean = true;
  
  private apiUrl = 'http://localhost:4321/api/Products/get-all';

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // 👈 2. استدعاء الدالة عند بداية التحميل
  ngOnInit(): void {
    this.getProducts();
    // // 👈 الطلب مش هينزل غير لما المتصفح يفتح الصفحة
    // if (isPlatformBrowser(this.platformId)) {
    //   this.getProducts();
    // }
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
}