import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination'; // 👈 استيراد الموديول المحدد فقط


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaginationModule.forRoot() // 👈 تفعيل الموديول بـ forRoot()
  ],
  exports: [
    PaginationModule // 👈 تصديره لاستخدامه في الـ Templates
  ]
})
export class SharedModule { }
