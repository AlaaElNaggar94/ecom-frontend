import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IProduct } from '../../../shared/models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {

  @Input({ required: true })
  products: IProduct[] = [];

  @Input()
  isLoading = false;

  @Output()
  addToCart = new EventEmitter<IProduct>();

  @Output()
  details = new EventEmitter<IProduct>();

  trackByProduct(index: number, product: IProduct): number {
    return product.id;
  }

  onAddToCart(product: IProduct): void {
    this.addToCart.emit(product);
  }

  onDetails(product: IProduct): void {
    this.details.emit(product);
  }

}