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
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { ToasterPopupService } from '../core/Services/toaster-popup.service';
import { BasketService } from '../features/components/basket/basket.service';

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
  smallnumPages = 0;
  selectedIndexMap = new Map<number, number>(); // key = productId (أو أي id عندك)

  constructor(
    private shopService: ShopService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private toasterPopup: ToasterPopupService,
    private basketService: BasketService,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadAllData(); // 👈 استدعاء الدالة المجمعة فقط عند فتح المتصفح
      // this.loadSpertedData(); // 👈 استدعاء الدالة المجمعة فقط عند فتح المتصفح
    }
  }

  loadSpertedData(): void {
    this.getProducts();
    setTimeout(() => {
      this.getCategories(); //yyyyyyyyyyyyyyyyyyyy
    }, 1000);
  }
  loadAllData(): void {
    this.isLoading = true; // 1. تشغيل spinner التحميل قبلهما هم الاثنين

    forkJoin({
      productsRes: this.shopService.getProducts(this.shopParams, false),
      categoriesRes: this.shopService.getCategories(),
    }).subscribe({
      next: ({ productsRes, categoriesRes }) => {
        // 2. استقبال بيانات الـ Products والـ Pagination
        this.products = productsRes.data;
        this.shopParams.pageNumber = productsRes.pageNumber;
        this.shopParams.pageSize = productsRes.pageSize;
        this.totalCount = productsRes.totalCount;

        // 3. استقبال بيانات الـ Categories
        this.categories = categoriesRes;
        this.toasterPopup.success('تم استرجاع المنتجات بنجاح ');
        // this.toasterPopup.success('تم استرجاع المنتجات ........ ');
        // 4. إيقاف التحميل
        this.isLoading = false;
      },
      error: (err) => {
        console.error('حدث خطأ أثناء تحميل البيانات:', err);
        this.isLoading = false;
      },
    });
  }

  getProducts(search: boolean = false): void {
    this.isLoading = true;
    this.shopService.getProducts(this.shopParams, search).subscribe({
      next: (response: IPaginatedResponse<IProduct>) => {
        this.products = response.data;
        // this.shopParams.pageNumber = response.pageNumber;
        // this.shopParams.pageSize = response.pageSize;
        this.shopParams = {
          ...this.shopParams,
          pageNumber: response.pageNumber,
          pageSize: response.pageSize,
        };
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

  onSortSelected(sort: string): void {
    this.shopParams.sort = sort;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onPageChanged(eventPage: any): void {
    // debugger
    if (this.shopParams.pageNumber !== eventPage.page) {
      this.shopParams.pageNumber = eventPage.page;
      this.getProducts();
      // console.log("F",this.shopParams);
      // console.log("F",this.totalCount);
    }
  }

  onSearch(search: string): void {
    this.shopParams.search = search;
    this.shopParams.pageNumber = 1;
    // this.getProducts(true);
    this.getProducts();
  }

  onReset(): void {
    this.shopParams = new ShopParams();
    this.getProducts();
  }

  selectedPhotoIndex(item: any): number {
    const key = item.id;
    return this.selectedIndexMap.get(key) ?? 0;
  }

  onAddToCart(product: IProduct): void {
    console.log('Add To Cart', product);
    this.basketService.addItemToBasket(product);
  }

  onDetails(product: IProduct): void {
    this.router.navigate(['shopping/product', product.id]);
  }

  // onSortSelected(event: any): void {
  //   this.shopParams.sort = event.target.value;
  //   this.getProducts();
  // }

  // onSearch(): void {
  //   // إضافة قيمة البحث في حالة استخدام Search Query في API
  //   this.shopParams.pageNumber = 1;
  //   this.getProducts();
  // }

  // onReset(): void {
  //   if (this.searchTerm) this.searchTerm.nativeElement.value = '';
  //   this.shopParams = new ShopParams();
  //   this.getProducts();
  // }

  // getMainPhotoUrl(item: any): string {
  //   if (!item.photos || item.photos.length === 0) {
  //     return 'assets/images/placeholder.png';
  //   }

  //   const idx = this.selectedPhotoIndex(item);
  //   const safeIdx = Math.max(0, Math.min(idx, item.photos.length - 1));
  //   return 'http://localhost:4321' + item.photos[safeIdx].imageUrl;
  // }

  // onSelectPhoto(item: any, index: number) {
  //   const key = item.id; // عدّلها لو اسم الـ id مختلف عندك
  //   this.selectedIndexMap.set(key, index);
  // }
}
