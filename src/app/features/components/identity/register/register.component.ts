import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '../identity.service';
import { Router } from '@angular/router';
import { ToasterPopupService } from '../../../../core/Services/toaster-popup.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errors: string | null = null;
  successMessage: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private router: Router,
    private toasterPopup: ToasterPopupService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      displayName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errors = null;
    this.successMessage = null;

    this.identityService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.successMessage =
          res.message ||
          'User registered successfully. Please check your email to activate your account.';
        this.toasterPopup.success('تم التسجيل بنجاح، يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب');
        setTimeout(() => {
          this.router.navigate(['/account/login']); // أو أي صفحة رئيسية بعد الدخول
        }, 500);
      },
      error: (err) => {
        this.loading = false;
        this.errors =
          err.error?.details ||
          err.error?.message ||
          'An error occurred during registration.';
      },
    });
  }
}
