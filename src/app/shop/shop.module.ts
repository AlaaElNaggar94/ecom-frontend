import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [ShopComponent],
  imports: [CoreModule, CommonModule],
  exports: [ShopComponent],
})
export class ShopModule {}
