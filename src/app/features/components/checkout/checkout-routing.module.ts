import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CheckoutComponent } from './checkout.component';


export const routes: Routes = [
  // توجيه الصفحة الرئيسية الافتراضية

  // الراوتس الأساسية
  { path: '', component: CheckoutComponent },
  //
  // راوت حماية للصفحات غير الموجودة (404)
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule { }
