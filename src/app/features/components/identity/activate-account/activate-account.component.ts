import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from '../identity.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {
  statusMessage: string = 'جاري تفعيل الحساب...';
  isSuccess: boolean = false;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private identityService: IdentityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      // قراءة الـ token أو الـ code مع معالجة الرموز المشفرة
      const rawToken = params['token'] || params['code'];

      if (email && rawToken) {
        // فك تشفير التوكن في حال احتواء الـ URL على رموز خاصة
        const token = decodeURIComponent(rawToken);
        this.verifyAccount(email, token);
      } else {
        this.loading = false;
        this.statusMessage = 'رابط التفعيل غير صالح أو غير مكتمل.';
        this.isSuccess = false;
      }
    });
  }

  verifyAccount(email: string, token: string) {
    this.identityService.activateAccount({ email, token }).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.isSuccess = true;
        this.statusMessage = res.message || 'تم تفعيل الحساب بنجاح. يمكنك تسجيل الدخول الآن.';
      },
      error: (err) => {
        this.loading = false;
        this.isSuccess = false;
        this.statusMessage = err.error?.message || 'فشل التفعيل، قد يكون الرمز منتهياً أو غير صحيح.';
      }
    });
  }
}