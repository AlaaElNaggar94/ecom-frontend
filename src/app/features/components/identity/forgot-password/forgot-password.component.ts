import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '../identity.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;
  message: string | null = null;
  error: string | null = null;
  loading = false;

  constructor(private fb: FormBuilder, private identityService: IdentityService) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.invalid) return;

    this.loading = true;
    this.error = null;
    this.message = null;

    this.identityService.forgetPassword(this.forgotForm.value).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.message = res.message || 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.';
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'حدث خطأ ما، تأكد من البريد الإلكتروني.';
      }
    });
  }
}