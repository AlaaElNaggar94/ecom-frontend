import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestSellerComponent } from './best-seller.component';
import { BestSellerRoutingModule } from './best-seller-routing.module';

@NgModule({
  declarations: [BestSellerComponent],
  imports: [CommonModule, BestSellerRoutingModule],
})
export class BestSellerModule {}
