import { Injectable, ApplicationRef, createComponent, EnvironmentInjector, inject } from '@angular/core';
import { NgxSpinnerService, NgxSpinnerComponent } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderCompleteFeaturesService {
  private spinner = inject(NgxSpinnerService);
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private isComponentCreated = false;

  /**
   * إنشاء وتحميل عنصر السبنر في الـ DOM ديناميكياً
   */
  private ensureSpinnerElementExists(): void {
    if (this.isComponentCreated) return;

    // 1. إنشاء الـ Component برمجياً
    const componentRef = createComponent(NgxSpinnerComponent, {
      environmentInjector: this.injector
    });

    // 2. ضبط الخصائص (Inputs) الافتراضية للـ Spinner
    componentRef.instance.bdColor = 'rgba(0, 0, 0, 0.8)';
    componentRef.instance.size = 'medium';
    componentRef.instance.color = '#fff';
    componentRef.instance.type = 'square-jelly-box';
    componentRef.instance.fullScreen = true;

    // 3. ربطه بـ Change Detection وحقنه داخل الـ <body>
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.isComponentCreated = true;
  }

  /**
   * إظهار السبنر مع إمكانية تخصيص الخصائص وقت الاستدعاء
   */
  show(options?: { bdColor?: string; color?: string; type?: string; size?: 'small' | 'medium' | 'large' }): void {
    this.ensureSpinnerElementExists();

    if (options) {
      // لو محتاج تغير الإعدادات لشاشة معينة
      this.spinner.show(undefined, options);
    } else {
      this.spinner.show();
    }
  }

  /**
   * إخفاء السبنر
   */
  hide(): void {
    this.spinner.hide();
  }
}