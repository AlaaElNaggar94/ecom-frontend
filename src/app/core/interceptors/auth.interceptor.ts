import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EMPTY } from 'rxjs';
import { SKIP_CREDENTIALS } from './skip-credentials.token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
if (req.context.get(SKIP_CREDENTIALS)) {
    return next(req);
  }
  // 1. إذا كنا داخل المتصفح: أضف withCredentials لتمرير الـ Cookie تلقائياً للـ Backend
  if (isPlatformBrowser(platformId)) {
    return next(req.clone({ withCredentials: true }));
  }

  // 2. إذا كنا في جانب السيرفر (SSR): إلغاء الطلب المحمي من السيرفر نهائياً
  // متصفح العميل سيقوم بطلبه بـ 200 بنجاح بمجرد تحميل الصفحة (Hydration)
  return EMPTY;
};