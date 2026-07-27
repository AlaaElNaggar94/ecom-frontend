import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    CoreModule,
    BrowserModule,
    AppRoutingModule,
    // HttpClientModule // 👈 2. إضافته هنا لتوفير خدمات الـ HTTP //// لكل المشروع  /// للمشاريع القديمة ///
  ],
  providers: [
    provideClientHydration(),
    // provideHttpClient() // 👈 تفعيل خدمات HTTP  ///  جديده ////
    provideHttpClient(withFetch()) // 👈 2. إضافة withFetch هنا() // 👈 تفعيل خدمات HTTP  ///  جديده ////
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
