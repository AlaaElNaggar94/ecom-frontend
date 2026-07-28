import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { IProduct } from '../../../../shared/models/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: IProduct;

  @Output() addToCart = new EventEmitter<IProduct>();

  @Output() details = new EventEmitter<IProduct>();

  readonly baseUrl = environment.baseUrl;

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  onDetails(): void {
    this.details.emit(this.product);
  }
}
