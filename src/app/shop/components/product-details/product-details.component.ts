import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../shop.service';
import { IProduct } from '../../../shared/models/Product';
import { environment } from '../../../../environments/environment';
import { BasketService } from '../../../features/components/basket/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product?: IProduct;
  quantity: number = 1;
  readonly baseUrl = environment.baseUrl;

  constructor(
    private shopService: ShopService,
    private basketService: BasketService,
    private toastr: ToastrService, // 👈 حقن ToastrService
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.shopService.getProductById(id).subscribe({
        next: (response) => {
          this.product = response;
        },
        error: (err) => {
          console.error('Error fetching product details:', err);
        },
      });
    }
  }
  // ... باقي المتغيرات

  // زيادة الكمية
  incrementQuantity(): void {
    if (this.quantity < 10) {
      this.quantity++;
      this.toastr.info(`تم زيادة الكمية إلى ${this.quantity}`, 'الكمية', {
        timeOut: 1500,
      });
    } else {
      this.toastr.warning('الحد الأقصى للطلب هو 10 قطع', 'تنبيـه');
    }
  }

  // تقليل الكمية
  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.toastr.info(`تم تقليل الكمية إلى ${this.quantity}`, 'الكمية', {
        timeOut: 1500,
      });
    } else {
      this.toastr.warning('الحد الأدنى للطلب هو قطعة واحدة', 'تنبيـه');
    }
  }

  // إضافة المنتج للسلة
  addToCart(): void {
    if (this.product) {
      this.basketService.addItemToBasket(this.product, this.quantity);
      this.toastr.success(
        `تم إضافة ${this.quantity} × "${this.product.name}" إلى السلة بنجاح`,
        'تمت الإضافة',
      );
    }
  }
}
