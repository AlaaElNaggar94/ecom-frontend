import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestContainerComponent } from './test-container/test-container.component';
import { C1Component } from './c1/c1.component';
import { C2Component } from './c2/c2.component';
import { C3Component } from './c3/c3.component';
import { C4Component } from './c4/c4.component';
import { CCartComponent } from './c-cart/c-cart.component';
import { CRegComponent } from './c-reg/c-reg.component';
import { CLogComponent } from './c-log/c-log.component';
import { COrdComponent } from './c-ord/c-ord.component';
import { CErrComponent } from './c-err/c-err.component';

const routes: Routes = [
  {
    path: '', 
    component: TestContainerComponent, // 👈 الحاوية الرئيسية التي تحتوي على Navbar و router-outlet
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: C1Component }, // أو الصفحة التي تريد عرضها كـ Home
      { path: 'shopping', component: C2Component },
      { path: 'about-us', component: C3Component },
      { path: 'best-seller', component: C4Component },
      { path: 'cart', component: CCartComponent },
      { path: 'register', component: CRegComponent },
      { path: 'login', component: CLogComponent },
      { path: 'my-orders', component: COrdComponent },
      { path: '**', component: CErrComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }