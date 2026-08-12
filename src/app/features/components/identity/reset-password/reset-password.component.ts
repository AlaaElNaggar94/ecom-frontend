import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from '../identity.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  email: string = '';
  token: string = '';
  message: string | null = null;
  error: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private identityService: IdentityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams['email'];
    this.token = this.route.snapshot.queryParams['token'];

    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator }); // إضافة دالة المطابقة
  }

  // Custom Validator للمطابقة بين كلمتي المرور
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // إزالة الخطأ إذا تطابقت القنوات
      if (control.get('confirmPassword')?.hasError('passwordMismatch')) {
        const errors = { ...control.get('confirmPassword')?.errors };
        delete errors['passwordMismatch'];
        control.get('confirmPassword')?.setErrors(Object.keys(errors).length ? errors : null);
      }
      return null;
    }
  }

  onSubmit() {
    if (this.resetForm.invalid || !this.email || !this.token) return;

    this.loading = true;
    this.error = null;
    this.message = null;

    const model = {
      email: this.email,
      token: this.token,
      newPassword: this.resetForm.value.newPassword // إرسال كلمة المرور فقط للـ API
    };

    this.identityService.resetPassword(model).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.message = 'تم تغيير كلمة المرور بنجاح. سيتم توجيهك لتسجيل الدخول...';
        setTimeout(() => this.router.navigate(['/account/login']), 3000);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'فشل إعادة تعيين كلمة المرور.';
      }
    });
  }
}