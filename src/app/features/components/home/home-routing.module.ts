import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from '../not-found/not-found.component';

export const routes: Routes = [
  // توجيه الصفحة الرئيسية الافتراضية

  // الراوتس الأساسية
  { path: '', component: HomeComponent },
  //
  // راوت حماية للصفحات غير الموجودة (404)
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
