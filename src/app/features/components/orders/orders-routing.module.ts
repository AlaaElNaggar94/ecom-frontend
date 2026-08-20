import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailedComponent } from './orders/order-detailed/order-detailed.component';

export const routes: Routes = [
  // توجيه الصفحة الرئيسية الافتراضية

  // الراوتس الأساسية
  { path: '', component: OrdersComponent },
  { path: ':id', component: OrderDetailedComponent }, // 👈 إضافة هذا المسار
  //
  // راوت حماية للصفحات غير الموجودة (404)
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule { }
