import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { environment } from '../environments/environment';
// import { ApiModule, Configuration } from './backend/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    CoreModule,
    BrowserModule,
    AppRoutingModule,
    // HttpClientModule // 👈 2. إضافته هنا لتوفير خدمات الـ HTTP //// لكل المشروع  /// للمشاريع القديمة ///
    
    // // ربط ملفات الـ API بالمشروع وتحديد رابط الباك إند
    // ApiModule.forRoot(() => new Configuration({
    //   basePath:  environment.baseUrl // رابط الباك إند الرئيسي
    // }))
  ],
  providers: [
    provideClientHydration(),
    // provideHttpClient() // 👈 تفعيل خدمات HTTP  ///  جديده ////
    provideHttpClient(withFetch()) // 👈 2. إضافة withFetch هنا() // 👈 تفعيل خدمات HTTP  ///  جديده ////
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
