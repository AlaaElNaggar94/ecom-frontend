// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { C1Component } from './test/c1/c1.component';
// import { C2Component } from './test/c2/c2.component';
// import { C3Component } from './test/c3/c3.component';
// import { C4Component } from './test/c4/c4.component';
// import { CErrComponent } from './test/c-err/c-err.component';
// import { CRegComponent } from './test/c-reg/c-reg.component';
// import { CCartComponent } from './test/c-cart/c-cart.component';
// import { CLogComponent } from './test/c-log/c-log.component';
// import { COrdComponent } from './test/c-ord/c-ord.component';
// import { HoComponent } from './test/glop/ho/ho.component';
// import { TestContainerComponent } from './test/test-container/test-container.component';
// import { Tes2ContainerComponent } from './test2/tes2-container/tes2-container.component';

// const routes: Routes = [
//   // 1. Redirect الرئيسي للـ Home عند فتح الموقع
//   { path: '', redirectTo: 'project1', pathMatch: 'full' },

//   // 2. المسارات الأساسية من الـ Navbar
//   { path: 'project1', component: TestContainerComponent },
//   { path: 'project2', component: Tes2ContainerComponent },
//   // 4. مسار الصفحات غير الموجودة (404 Page Not Found)
//   { path: '**', component: CErrComponent }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, {
//     scrollPositionRestoration: 'enabled' // لإعادة التمرير لأعلى الصفحة عند التنقل
//   })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }




import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoComponent } from './test/glop/ho/ho.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcom-page', pathMatch: 'full' },

  // 🚀 تحميل الموديول الأول بـ Lazy Loading
  {
    path: 'welcom-page',
    component: HoComponent,
  },
  // 🚀 تحميل الموديول الأول بـ Lazy Loading
  {
    path: 'test1',
    loadChildren: () => import('./test/test.module').then((m) => m.TestModule),
  },

  // 🚀 تحميل الموديول الثاني بـ Lazy Loading
  {
    path: 'test2',
    loadChildren: () =>
      import('./test2/test2.module').then((m) => m.Test2Module),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./test/c-err/c-err.component').then((m) => m.CErrComponent),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // لإعادة التمرير لأعلى الصفحة عند التنقل
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
