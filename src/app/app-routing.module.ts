import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './features/components/home/home.component';
import { AboutUsComponent } from './features/components/about-us/about-us.component';
import { BestSellerComponent } from './features/components/best-seller/best-seller.component';
import { NotFoundComponent } from './features/components/not-found/not-found.component';

// export const routes: Routes = [
//   // توجيه الصفحة الرئيسية الافتراضية
//   { path: '', redirectTo: 'home', pathMatch: 'full' },

//   // الراوتس الأساسية
//   { path: 'home', component: HomeComponent },
//   { path: 'shopping', component: ShopComponent },
//   { path: 'about-us', component: AboutUsComponent },
//   { path: 'best-seller', component: BestSellerComponent },
//   //
//   // راوت حماية للصفحات غير الموجودة (404)
//   { path: '**', component: NotFoundComponent },
// ];


///////////////******************************////////////////////////// */





export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    loadChildren: () =>
      import('./features/components/home/home.module').then(
        (m) => m.HomeModule,
      ),
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./features/components/about-us/about-us.module').then(
        (m) => m.AboutUsModule,
      ),
  },
  {
    path: 'best-seller',
    loadChildren: () =>
      import('./features/components/best-seller/best-seller.module').then(
        (m) => m.BestSellerModule,
      ),
  },
  {
    path: 'shopping',
    loadChildren: () => import('./shop/shop.module').then((m) => m.ShopModule),
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
