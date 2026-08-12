import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '../identity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = null;

    this.identityService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.router.navigate(['/home']); // أو أي صفحة رئيسية بعد الدخول
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'فشل تسجيل الدخول، تأكد من البيانات.';
      }
    });
  }
}