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
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';

@NgModule({
  declarations: [
    ShopComponent,
    ProductImagesComponent,
    ProductCardComponent,
    ProductListComponent,
    ShopFiltersComponent,
    ShopSearchComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ShopRoutingModule,
  ],
  exports: [ShopComponent, CoreModule],
})
export class ShopModule {}
