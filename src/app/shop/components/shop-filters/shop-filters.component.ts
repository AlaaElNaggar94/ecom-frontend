import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { ICategory } from '../../../shared/models/Category';
import { ShopParams } from '../../shop.service';

export interface ISortOptions 
 {
  id: string;
  name: string;
}

@Component({
  selector: 'app-shop-filters',
  templateUrl: './shop-filters.component.html',
  styleUrls: ['./shop-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopFiltersComponent {
  @Input({ required: true })
  categories: ICategory[] = [];

  @Input({ required: true })
  shopParams!: ShopParams;

  @Output()
  categoryChanged = new EventEmitter<number>();

  @Output()
  sortChanged = new EventEmitter<string>();

  // قائمة خيارات الترتيب
sortOptions :ISortOptions[] = [
  { name: 'Name', id: 'name' },
  { name: 'Price: Low to High', id: 'PriceAsc' },
  { name: 'Price: High to Low', id: 'PriceDesc' }
];

  onCategorySelected(categoryId: number): void {
    this.categoryChanged.emit(categoryId);
  }

  onSortSelected(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.sortChanged.emit(value);
  }

  trackByCategory(index: number, category: ICategory): number {
    return category.id;
  }
}
