import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { ShopParams } from '../../shop.service';

@Component({
  selector: 'app-shop-search',
  templateUrl: './shop-search.component.html',
  styleUrls: ['./shop-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopSearchComponent {

  @Input({ required: true })
  totalCount = 0;

  @Input({ required: true })
  shopParams!: ShopParams;

  @Output()
  search = new EventEmitter<string>();

  @Output()
  reset = new EventEmitter<void>();

  searchTerm = '';

  onSearch(): void {
    this.search.emit(this.searchTerm.trim());
  }

  onReset(): void {
    this.searchTerm = '';
    this.reset.emit();
  }

  get from(): number {

    if (this.totalCount === 0) {
      return 0;
    }

    return ((this.shopParams.pageNumber - 1) * this.shopParams.pageSize) + 1;

  }

  get to(): number {

    const value =
      this.shopParams.pageNumber * this.shopParams.pageSize;

    return Math.min(value, this.totalCount);

  }

}