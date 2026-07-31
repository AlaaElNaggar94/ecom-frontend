import { Component, inject } from '@angular/core';
import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from '../Services/loading.service';
import { LoaderCompleteFeaturesService } from '../Services/loader-complete-feature.service';

export const SKIP_LOADING = new HttpContextToken<boolean>(() => false);

let totalRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // لتجاوز السبنر في الـ Request الخاص بك، قم باستيراد SKIP_LOADING و
  // HttpContext من @angular/common/http وإضافتها في الـ
  //  Options الخاصة بالـ HttpClient بالشكل التالي:

  // TypeScript

  console.log('Interceptor hit:', req.url);
  // debugger
  // فحص هل الـ Request فيه التوكن لتجاهل السبنر
  if (req.context.get(SKIP_LOADING)) {
    // debugger
    return next(req); // مرر الـ Request مباشرة بدون سبنر
  }

  // const spinner = inject(NgxSpinnerService);

  // لو هتستخدم الشكل ده لازم تضيف
  // <ngx-spinner></ngx-spinner>
  // فى
  // app-Component
  // لان داله الshow
  // بتعمل اعدادات بس
  // انما مش بتظهر

  const spinner = inject(LoadingService);

  // انما دى يبقى فيها جزء الاعدادات
  // وانشاء ال component
  // ومن غير ما تضيف
  // <ngx-spinner></ngx-spinner>
  // فى
  // app-Component

  // const spinner = inject(LoaderCompleteFeaturesService);

  if (totalRequests == 0) {
    spinner.show();
  }
  totalRequests++;

  return next(req).pipe(
    finalize(() => {
      totalRequests--;
      if (totalRequests == 0) {
        spinner.hide();
      }
    }),
  );
};

// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpContextToken } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { delay, finalize } from 'rxjs/operators';
// import { NgxSpinnerService } from 'ngx-spinner';

// export const SKIP_LOADING = new HttpContextToken<boolean>(() => false);

// @Injectable()
// export class LoadingInterceptor implements HttpInterceptor {
//   private totalRequests = 0;

//   constructor(private spinner: NgxSpinnerService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

// لتجاوز السبنر في الـ Request الخاص بك، قم باستيراد SKIP_LOADING و
// HttpContext من @angular/common/http وإضافتها في الـ
//  Options الخاصة بالـ HttpClient بالشكل التالي:

// TypeScript

//     // فحص هل الـ Request فيه التوكن لتجاهل السبنر
//     if (request.context.get(SKIP_LOADING)) {
//       return next.handle(request); // مرر الـ Request مباشرة بدون سبنر
//     }

//     if (this.totalRequests === 0) {
//       this.spinner.show();
//     }
//     this.totalRequests++;

//     return next.handle(request).pipe(
//       delay(1000),
//       finalize(() => {
//         this.totalRequests--;
//         if (this.totalRequests === 0) {
//           this.spinner.hide();
//         }
//       })
//     );
//   }
// }
