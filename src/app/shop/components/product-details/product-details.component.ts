import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../shop.service';
import { IProduct } from '../../../shared/models/Product';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: IProduct;
   quantity: number = 1;
  readonly baseUrl = environment.baseUrl;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute
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
        }
      });
    }
  }
  // ... باقي المتغيرات
 

  // زيادة الكمية
  incrementQuantity(): void {
    if (this.quantity < 10) { // حد أقصى للكمية اختياري
      this.quantity++;
    }
  }

  // تقليل الكمية
  decrementQuantity(): void {
    if (this.quantity > 1) { // عدم التقليل عن 1
      this.quantity--;
    }
  }
}