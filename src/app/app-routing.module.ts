import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'shopping',
    loadChildren: () => import('./shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: 'basket',
    loadChildren: () =>
      import('./features/components/basket/basket.module').then(
        (m) => m.BasketModule,
      ),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./features/components/checkout/checkout.module').then(
        (m) => m.CheckoutModule,
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/components/orders/orders.module').then(
        (m) => m.OrdersModule,
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
    path: 'account',
    loadChildren: () =>
      import('./features/components/identity/identity.module').then(
        (m) => m.IdentityModule,
      ),
  },

  { path: '**', 
    loadChildren: () =>
      import('./features/components/not-found/not-found.module').then(
        (m) => m.NotFoundModule,
      )
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
