import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { NotFoundComponent } from '../features/components/not-found/not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
  // توجيه الصفحة الرئيسية الافتراضية

  // الراوتس الأساسية
  { path: '', component: ShopComponent },
  //
  { path: 'product/:id', component: ProductDetailsComponent },
  // راوت حماية للصفحات غير الموجودة (404)
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
