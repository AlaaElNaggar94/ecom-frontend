import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToasterPopupService } from '../Services/toaster-popup.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notify = inject(ToasterPopupService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'حدث خطأ غير متوقع، برجاء المحاولة لاحقاً';

      if (error) {
        switch (error.status) {
          case 400:
            // لو الـ Backend بيرجع رسالة معينة جوه الـ error body
            errorMessage = error.error?.message || 'البيانات المدخلة غير صحيحة';
            break;
          case 401:
            errorMessage = 'جلسة العمل انتهت، برجاء تسجيل الدخول مجدداً';
            break;
          case 403:
            errorMessage = 'ليس لديك الصلاحية للوصول لهذا العنصر';
            break;
          case 404:
            errorMessage = 'العنصر المطلوب غير موجود';
            break;
          case 500:
            errorMessage = 'حدث خطأ داخلي في الخادم (Server Error)';
            break;
          default:
            errorMessage = error.error?.message || errorMessage;
            break;
        }
      }

      // إظهار التنبيه عبر السيرفس الموحدة
      notify.error(errorMessage);

      // إعادة رمي الخطأ ليتم التعامل معه في الكود لو احتاج الأمر
      return throwError(() => error);
    })
  );
};