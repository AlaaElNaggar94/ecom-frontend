import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationComponent } from './component/pagination/pagination.component'; // 👈 استيراد الموديول المحدد فقط
import { FormsModule } from '@angular/forms';
import { OrderSummaryComponent } from './component/order-summary/order-summary.component';


@NgModule({
  declarations: [
    PaginationComponent,
    OrderSummaryComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    PaginationModule.forRoot() // 👈 تفعيل الموديول بـ forRoot()
  ],
  exports: [
    PaginationComponent,
    OrderSummaryComponent
  ]
})
export class SharedModule { }
