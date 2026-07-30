import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TesErrComponent } from './tes-err/tes-err.component';
import { Tes2ContainerComponent } from './tes2-container/tes2-container.component';
import { Tes1Component } from './tes1/tes1.component';
import { Tes2Component } from './tes2/tes2.component';
import { Tes3Component } from './tes3/tes3.component';
import { Tes4Component } from './tes4/tes4.component';
import { Tes5Component } from './tes5/tes5.component';
import { Tes6Component } from './tes6/tes6.component';
import { Tes7Component } from './tes7/tes7.component';
import { Tes8Component } from './tes8/tes8.component';



const routes: Routes = [
  {
    path: '', 
    component: Tes2ContainerComponent, // 👈 الحاوية الرئيسية التي تحتوي على Navbar و router-outlet
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Tes1Component }, // أو الصفحة التي تريد عرضها كـ Home
      { path: 'shopping', component: Tes2Component },
      { path: 'about-us', component: Tes3Component },
      { path: 'best-seller', component: Tes4Component },
      { path: 'cart', component: Tes5Component },
      { path: 'register', component: Tes6Component   },
      { path: 'login', component: Tes7Component },
      { path: 'my-orders', component: Tes8Component },
      { path: '**', component: TesErrComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Test2RoutingModule { }