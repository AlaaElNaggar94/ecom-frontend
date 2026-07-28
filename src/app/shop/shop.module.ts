import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { CoreModule } from '../core/core.module';
import { ProductCardComponent } from './components/product-list/product-card/product-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductImagesComponent } from './components/product-list/product-card/product-images/product-images.component';
import { ShopFiltersComponent } from './components/shop-filters/shop-filters.component';
import { ShopSearchComponent } from './components/shop-search/shop-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShopComponent,
    ProductImagesComponent,
    ProductCardComponent,
    ProductListComponent,
    ShopFiltersComponent,
    ShopSearchComponent,
  ],
  imports: [CoreModule, CommonModule, FormsModule],
  exports: [ShopComponent,ShopSearchComponent],
})
export class ShopModule {}
