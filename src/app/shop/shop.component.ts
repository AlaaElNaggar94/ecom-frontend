import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ShopService, ShopParams } from './shop.service';
import { IProduct } from '../shared/models/Product';
import { IPaginatedResponse } from '../shared/models/PaginatedResponse';
import { ICategory } from '../shared/models/Category';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;

  products: IProduct[] = [];
  categories: ICategory[] = []; // 👈 تخزين الأقسام هنا  shopParams = new ShopParams();
  shopParams = new ShopParams();

  totalCount: number = 0;
  isLoading: boolean = true;

  constructor(
    private shopService: ShopService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getProducts();
      this.getCategories(); // تفعيلها عند وجود Api للأقسام
    }
  }

  getProducts(): void {
    this.isLoading = true;
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response: IPaginatedResponse<IProduct>) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageNumber;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.totalCount;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
      },
    });
  }
  // 👈 دالة جلب الأقسام
  getCategories(): void {
    this.shopService.getCategories().subscribe({
      next: (response: ICategory[]) => {
        this.categories = response;
      },
      error: (err) => {
        console.error('حدث خطأ أثناء جلب الأقسام:', err);
      },
    });
  }

  onCategorySelected(categoryId: number): void {
    this.shopParams.categoryId = categoryId;
    this.shopParams.pageNumber = 1; // العودة للصفحة الأولى عند تغيير الفلتر
    this.getProducts();
  }

  onSortSelected(event: any): void {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(eventPage: number): void {
    if (this.shopParams.pageNumber !== eventPage) {
      this.shopParams.pageNumber = eventPage;
      this.getProducts();
    }
  }

  onSearch(): void {
    // إضافة قيمة البحث في حالة استخدام Search Query في API
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(): void {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
