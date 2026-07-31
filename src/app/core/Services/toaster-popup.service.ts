import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterPopupService {
  private toastr = inject(ToastrService);

  // 1. رسائل النجاح (Success)
  success(message: string, title: string = 'نجاح'): void {
    this.toastr.success(message, title);
  }

  // 2. رسائل الأخطاء (Error)
  error(message: string, title: string = 'خطأ'): void {
    this.toastr.error(message, title);
  }

  // 3. رسائل التحذير (Warning)
  warning(message: string, title: string = 'تحذير'): void {
    this.toastr.warning(message, title);
  }

  // 4. رسائل المعلومات (Info)
  info(message: string, title: string = 'معلومة'): void {
    this.toastr.info(message, title);
  }
}